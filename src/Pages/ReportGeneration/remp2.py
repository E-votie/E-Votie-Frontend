import os
import json

def save_district_results_from_file(input_file):
    # Read data from the input JSON file
    with open(input_file, 'r', encoding='utf-8') as file:
        districts_data = json.load(file)

    # Create directory to store individual district result files
    folder_name = "pie_data_district_results"
    os.makedirs(folder_name, exist_ok=True)

    # Process each district's data
    for index, district_data in enumerate(districts_data):
        # Get the results array
        results = district_data["results"]

        # Create a filename using the index to distinguish files
        file_name = f"{district_data["district"]}_2019.json"
        file_path = os.path.join(folder_name, file_name)

        # Save only the results data as a JSON file
        with open(file_path, 'w', encoding='utf-8') as json_file:
            json.dump(results, json_file, ensure_ascii=False, indent=4)

        print(f"Results saved to {file_path}")

# Example usage
input_file = 'result.json'  # Replace with your actual file name
save_district_results_from_file(input_file)
