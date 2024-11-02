import json

# Read data from JSON file
input_file = 'election_results_division_2019.json'  # Replace with your input file name
with open(input_file, 'r') as f:
    data = json.load(f)

# Group results by district
district_results = {}
for item in data:
    district = item['district']
    if district not in district_results:
        district_results[district] = []
    district_results[district].append(item)

# Create JSON files for each district
for district, results in district_results.items():
    filename = f"./DistrictResult/{district}_2019.json"
    with open(filename, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"Created {filename}")