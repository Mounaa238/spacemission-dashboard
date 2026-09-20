from backend.database import supabase

def get_weather(city,country):
    print(f"Getting weather data for{city},{country}...")

    result=(
        supabase.table("weather_data")
        .select("*")
        .eq("location",city)
        .eq("country",country)
        .order("observed_at")
        .execute()
    )
    return result.data
if __name__ == "__main__":
    city=input("Enter a city:").strip()
    country=input("Enter a country:").strip()
    weather=get_weather(city,country)
    print(f"Found {len(weather)} weather records.")
    for record in weather[:5]:
        print(record)    