def normalize_weather(data,location,country,latitude,longitude):
    hourly=data["hourly"]
    times=hourly["time"]
    temperature=hourly["temperature_2m"]
    humidity=hourly["relative_humidity_2m"]
    precipitation=hourly["precipitation"]
    normalized=[]
    for i in range(len(times)):
        record={
            "source":"Open-Meteo",
            "location":location,
            "country":country,
            "latitude":latitude,
            "longitude":longitude,
            "observed_at":times[i],
            "temperature":temperature[i],
            "humidity":humidity[i],
            "precipitation":precipitation[i]
        }
        normalized.append(record)
    return normalized