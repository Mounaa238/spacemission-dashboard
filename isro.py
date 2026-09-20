import json
import requests
from bs4 import BeautifulSoup
ISRO_URL= "https://www.isro.gov.in/SpacecraftMissions.html"
def fetch_isro_missions():
    print("="*50)
    print("ISRO MISSION DATA FETCHER")
    print("="*50)
    print(f"\nReading: {ISRO_URL}")
    response=requests.get(ISRO_URL,timeout=30)
    response.raise_for_status()
    soup=BeautifulSoup(response.text,"html.parser")
    table=soup.find("table")
    if not table:
        raise ValueError("ISRO mission table not found.")
    missions=[]
    rows=table.find_all("tr")
    for row in rows[1:]:
        cells=row.find_all(["td","th"])
        if len(cells)<5:
            continue
        values=[
            cell.get_text("",strip=True)
            for cell in cells
            ]
        mission={
            "name":values[1],
            "launch_date":values[2],
            "launch_vehicle":values[3],
            "status":values[4],
            "source":"ISRO",
            "source_url":ISRO_URL
        }
        missions.append(mission)
    print(f"\nFound {len(missions)}ISRO missions.")
    return missions
def save_json(missions):
    output_file="backend/isro_missions.json"
    data={
        "source":"ISRO",
        "source_url":ISRO_URL,
        "total_missions":len(missions),
        "missions":missions
    }
    with open(output_file,"w",encoding="utf-8")as file:
        json.dump(data,file,indent=4,ensure_ascii=False) 
    print(f"\nJSON saved:{output_file}")
    return output_file
def upload_missions_to_supabase(missions):
    """Upload ISRO missions to Supabase"""
    from backend.database import supabase
    print("\nUploading ISRO missions to supabase...")
    inserted=0
    skipped=0
    for mission in missions:
        existing=(
            supabase
            .table("isro_missions")
            .select("id")
            .eq("name", mission["name"])
            .execute()
        )
        if existing.data:
            skipped += 1
            continue
        supabase.table("isro_missions").insert(mission).execute()
        inserted += 1
    print(f"Imserted {inserted} ISRO missions.")
    print(f"Skipped{skipped} duplicate missions.")

if __name__=="__main__":
    missions=fetch_isro_missions()
    output_file=save_json(missions)
    upload_missions_to_supabase(missions)

    print("\n"+"="*50) 
    print("DONE")
    print("="*50)      
    print(f"ISRO missions saved:{len(missions)}")
    print(f"JSON file:{output_file}")