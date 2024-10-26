import json
import os

# The original data with image and color information
all_island_results = [
    {
        'Name': 'Gotabaya Rajapaksa',
        'Party': 'SLPP',
        'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/gr-2019-pe1.png',
        'count': 6924255,
        'present': 52.25,
        'color': '#b41f24'
    },
    {
        'Name': 'Sajith Premadasa',
        'Party': 'NDF',
        'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/sp-2019-pe1.png',
        'count': 5564239,
        'present': 41.99,
        'color': '#0e723a'
    },
    {
        'Name': 'Anura Kumara Dissanayaka',
        'Party': 'NMPP',
        'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/akd-2019-pe1.png',
        'count': 418553,
        'present': 3.16,
        'color': '#8c0154'
    },
    {
        'Name': 'Mahesh Senanayake',
        'Party': 'NPP',
        'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/msn-2019-pe1.png',
        'count': 49655,
        'present': 0.37,
        'color': '#83c341'
    },
    {
        'Name': 'Mahesh Senanayake',
        'Party': 'OTHER',
        'Image': 'http://election.adaderana.lk/presidential-election-2019/assets/images/icon-party-other.png',
        'count': 295797,
        'present': 2.23,
        'color': '#a5a5Aa'
    }
]

# Create a dictionary to map parties to their image and color
party_info = {result['Party']: {'Image': result['Image'], 'color': result['color']} for result in all_island_results}

# Specify the directory containing the JSON files
folder_path = './pie_data_district_results'

# Loop through all files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith('.json'):
        # Full path to the file
        file_path = os.path.join(folder_path, filename)

        # Read the JSON file
        with open(file_path, 'r') as file:
            file_data = json.load(file)

        # Update the JSON data with image and color information
        for result in file_data:
            party = result['party']
            if party in party_info:
                result['Image'] = party_info[party]['Image']
                result['color'] = party_info[party]['color']
            else:
                # Use 'OTHER' info for parties not found in all_island_results
                result['Image'] = party_info['OTHER']['Image']
                result['color'] = party_info['OTHER']['color']

        # Save the updated JSON back to the file
        with open(file_path, 'w') as file:
            json.dump(file_data, file, indent=2)

print("All files have been updated.")
