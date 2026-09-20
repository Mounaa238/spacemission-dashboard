import json
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup

NASA_MISSIONS_URL = "https://science.nasa.gov/missions/"

HEADERS = {
    "User-Agent": "Space Mission Dashboard/1.0"
}


def clean_text(text):
    """Remove extra spaces and newlines."""

    if not text:
        return None

    return " ".join(text.split()).strip()


def get_mission_links(page_url):
    """Get mission page links from NASA's mission directory."""

    print(f"Reading: {page_url}")

    response = requests.get(
        page_url,
        headers=HEADERS,
        timeout=30
    )

    response.raise_for_status()

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    missions = []

    for link in soup.find_all("a", href=True):

        href = link["href"]

        title = clean_text(
            link.get_text(" ", strip=True)
        )

        if not title:
            continue

        if "/mission/" not in href:
            continue

        if href.startswith("/"):
            href = "https://science.nasa.gov" + href

        if not href.startswith(
            "https://science.nasa.gov/mission/"
        ):
            continue

        missions.append({
            "name": title,
            "url": href
        })

    unique = {}

    for mission in missions:
        unique[mission["url"]] = mission

    return list(unique.values())


def get_mission_details(mission):
    """Fetch information from an individual NASA mission page."""

    url = mission["url"]

    print(f"Fetching: {mission['name']}")

    response = requests.get(
        url,
        headers=HEADERS,
        timeout=30
    )

    response.raise_for_status()

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    page_text = soup.get_text(
        "\n",
        strip=True
    )

    lines = []

    for line in page_text.splitlines():

        line = clean_text(line)

        if line:
            lines.append(line)

    data = {
        "name": mission["name"],
        "url": url,
        "source": "NASA Science",
        "description": None,
        "launch_date": None,
        "launch_site": None,
        "destination": None,
        "mission_type": None,
        "status": None
    }

    description = soup.find(
        "meta",
        attrs={"name": "description"}
    )

    if description:

        data["description"] = clean_text(
            description.get("content")
        )

    field_map = {
        "Launch Date": "launch_date",
        "Launch Site": "launch_site",
        "Destination": "destination",
        "Type": "mission_type",
        "Status": "status"
    }

    for index, line in enumerate(lines):

        for label, field in field_map.items():

            if line.lower() == label.lower():

                if index + 1 < len(lines):

                    value = clean_text(
                        lines[index + 1]
                    )

                    if value:
                        data[field] = value

    return data


def save_json(missions):
    """Save mission data as clean JSON."""

    output = {
        "source": "NASA Science",
        "source_url": NASA_MISSIONS_URL,
        "total_missions": len(missions),
        "missions": missions
    }

    output_file = (
        Path(__file__).parent /
        "nasa_missions.json"
    )

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            output,
            file,
            indent=4,
            ensure_ascii=False
        )

    return output_file


def fetch_all_missions():
    """Fetch NASA missions efficiently from the mission directory."""

    print("="*50)
    print("NASA MISSION DATA FETCHER")
    print("="*50)

    all_missions = []

    page_number = 1

    while True:

        if page_number == 1:
            page_url = NASA_MISSIONS_URL
        else:
            page_url = (
                f"https://science.nasa.gov/"
                f"missions/page/{page_number}/"
            )

        try:
            missions = get_mission_links(page_url)

        except requests.RequestException as error:
            print(
                f"Could not read page {page_number}: "
                f"{error}"
            )
            break

        if not missions:
            print(f"\nNo more mission pages found.")
            break

        print(
            f"Found {len(missions)} mission links "
            f"on page {page_number}."
        )

        all_missions.extend(missions)

        unique_urls = {
            mission["url"]: mission
            for mission in all_missions
        }

        all_missions = list(
            unique_urls.values()
        )

        page_number += 1

        time.sleep(0.5)

        if page_number > 50:
            print(
                "\nReached the 50-page safety limit."
            )
            break

    print(
        f"\nTotal unique mission pages found: "
        f"{len(all_missions)}"
    )


    cleaned_missions = []

    for number, mission in enumerate(
        all_missions,
        start=1
    ):

        print(
            f"\n[{number}/{len(all_missions)}] "
            f"{mission['name']}"
        )

        try:

            data = get_mission_details(
                mission
            )

            cleaned_missions.append(data)

        except requests.RequestException as error:

            print(
                f"Skipping {mission['name']}: "
                f"{error}"
            )

        time.sleep(0.3)

    return cleaned_missions

def upload_missions_to_supabase(missions):
    print("UPLOAD FUNCTION STARTED")
    from backend.database import supabase
    print("\nUploading missions to supabse...")
    inserted=0
    skipped=0
    for mission in missions:
        existing=(
            supabase.table("nasa_missions") 
                    .select("id")
                    .eq("name", mission["name"]) 
                    .execute()                 
                    )
        if existing.data:
            skipped += 1
            continue
        supabase.table("nasa_missions").insert(mission).execute()
        inserted += 1
    print(f"Inserted {inserted}NASA missions.")
    print(f"Skipped{skipped} duplicate missions.")    

if __name__ == "__main__":

    missions = fetch_all_missions()

    extra_missions=[
        {
            "name":"Aetemis I",
            "url":"https://science.nasa.gov/mission/artemis-i/",
            "source":"NASA Science",
            "destination": None,
            "launch_date": None,
            "launch_site": None,
            "destination": None,
            "mission_type": None,
            "status": None
        },
        {
            "name":"Artemis II",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description": None,
            "launch_date": None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Europa Clipper",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Psyche",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Lucy",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"DART",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Juno",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"New Horizons",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Mars 2020: Perseverance Rover",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Mars Science Laboratory: Curiosity Rover",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Sccience",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Parker Solar Probe",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
        {
            "name":"Solar Dynamics Observatory",
            "url": "https://science.nasa.gov/mission/artemis-ii/",
            "source":"NASA Science",
            "description":None,
            "launch_date":None,
            "launch_site":None,
            "destination":None,
            "mission_type":None,
            "status":None
        },
    ]
    missions.extend(extra_missions)
    print(f"\nTotal missions prepared:{len(missions)}")


    output_file = save_json(
        missions
    )
    upload_missions_to_supabase(
        missions
    )

    print("\n" + "=" * 50)
    print("DONE")

    print(
        f"NASA missions saved:{len(missions)}"
    )

    print(
        f"JSON file: {output_file}"
    )


