import requests

def fetch_data(option):
    url = f"https://swapi.mimo.dev/api/{option}/"
    data = []

    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        print(f"{len(data)} data point were retrieved")
    except requests.HTTPError as e:
        print(f"Error {e}, data was not retrieved")
        return None

    return data

# Map each category to its corresponding key
key_map = {
    "people": "name",
    "planets": "name",
    "starships": "name",
    "vehicles": "name",
    "species": "name",
    "films": "title"
}

valid_options = list(key_map.keys())

print(f"Valid options: {', '.join(valid_options)}")
option = input(
    "What Star Wars information do you want to know?: ").strip().lower()
data = fetch_data(option)

if data:
    key = key_map[option]
    for dt in data:
        print(dt[key])
else:
    print("Unable to download data")
