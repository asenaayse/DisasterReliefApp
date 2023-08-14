import random
from datetime import datetime, timedelta
from geopy.geocoders import Nominatim
import json

def random_coordinates():
    cities = {
        "Kahramanmaraş": {"lat": 37.5794, "lng": 36.9371},
        "Gaziantep": {"lat": 37.0662, "lng": 37.3833},
        "Şanlıurfa": {"lat": 37.1674, "lng": 38.7939},
        "Diyarbakır": {"lat": 37.9144, "lng": 40.2306},
        "Adana": {"lat": 37.0000, "lng": 35.3213},
        "Adıyaman": {"lat": 37.7648, "lng": 38.2763},
        "Osmaniye": {"lat": 37.0742, "lng": 36.2472},
        "Hatay": {"lat": 36.2031, "lng": 36.1600},
        "Elazığ": {"lat": 38.6759, "lng": 39.2205},
        "Malatya": {"lat": 38.3552, "lng": 38.3095}
    }

    city = random.choice(list(cities.keys()))
    lat_range = (cities[city]["lat"] - 0.1, cities[city]["lat"] + 0.1)
    lng_range = (cities[city]["lng"] - 0.1, cities[city]["lng"] + 0.1)

    latitude = random.uniform(*lat_range)
    longitude = random.uniform(*lng_range)
    return {
        "latitude": latitude,
        "longitude": longitude,
        "location_name": city
    }

def random_expiration_date():
    start_date = datetime(2023, 12, 1)
    end_date = datetime(2024, 7, 31)
    random_days = random.randint(0, (end_date - start_date).days)
    return (start_date + timedelta(days=random_days)).strftime("%Y-%m-%d")

dataset = []
categories = {
    "Medical": ['Painkiller', 'Bandage'],
    "Heating": ['Blanket', 'Electric_Heater'],
    "Shelter": ['Tent', 'Container'],
    "Nutrition": ['Food', 'Water'],
}

for i in range(150):
    print("working on datum", i )
    amount = round(random.uniform(1, 15))
    category = random.choice(["Medical", "Heating", "Shelter", "Nutrition"])
    subCategory = random.choice(categories[category])
    expiration_date = random_expiration_date() if category == "nutrition" else None
    location_data = random_coordinates()
    name = "demo@gmail.com"
    
    entry = {
        "name": name,
        "amount": amount,
        "category": category,
        "subCategory": subCategory,
        "expiration_date": expiration_date,
        "location": location_data["location_name"],
        "locationLat": location_data["latitude"],
        "locationLng": location_data["longitude"]
    }
    dataset.append(entry)

with open("maras_random_dataset.json", "w") as json_file:
    json.dump(dataset, json_file, indent=2)
