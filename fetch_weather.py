import requests
from backend.normalize import normalize_weather
from backend.database import supabase

def get_coordinates(city,country):
    import pycountry
    country_info=pycountry.countries.search_fuzzy(country)[0]
    country_code=country_info.alpha_2

    url="https://geocoding-api.open-meteo.com/v1/search"

    params={
        "name":city,
        "count":10,
        "language":"en",
        "format":"json",
        "countryCode": country_code
    }
        
    
    response=requests.get(url,
                          params=params,
                          timeout=30
                          )
    
    response.raise_for_status()
    data=response.json()
    if "results" not in data or not data["results"]:
        raise ValueError(f"City not found:{city},{country}")

    results=data["results"]

    country_matches=[
        r for r in results
        if r.get("country","").lower()==country.lower()
    ]
    result=data["results"][0]
    return (
            result["latitude"],
            result["longitude"],
            result["name"]
            
    )


URL = "https://api.open-meteo.com/v1/forecast"


def fetch_weather(latitude,longitude):
    print("Fetching weather data...")

    params={
        "latitude":latitude,
        "longitude":longitude,
        "hourly":"temperature_2m,relative_humidity_2m,precipitation",
        "forecast_days":7,
        "timezone":"auto"
    }
    response=requests.get(
        URL,
        params=params,
        timeout=30
    )
    response.raise_for_status()

    return response.json()

def upload_weather(data,city,country,latitude,longitude):
    print("Cleaning and normalizing data...")
    rows = normalize_weather(
        data,
        location=city,
        country=country,
        latitude=latitude,
        longitude=longitude
    )
    print(f"Prepared {len(rows)} weather records.")
    print("Uploading to Supabase...")
    result = supabase.table("weather_data").insert(rows).execute()
    print(f"Inserted {len(result.data)} rows.")


if __name__ == "__main__":
    city=input("Enter a city:").strip()
    country=input("Enter a country:").strip()
    latitude,longitude,city_name=get_coordinates(city,country)
    print(f"Fetching weather for{city_name},{country}...")
    data=fetch_weather(latitude,longitude)
    upload_weather(
        data,
        city_name,
        country,
        latitude,
        longitude
    )
    print("Done!")
