import json
import os

def separate_geojson_by_adm2_en(input_geojson_path):
    # Load the GeoJSON file
    with open(input_geojson_path, 'r') as f:
        geojson_data = json.load(f)

    # Create a directory to store the output files
    output_dir = 'GeoData'
    os.makedirs(output_dir, exist_ok=True)

    # Dictionary to hold features by ADM2_EN
    features_by_adm2_en = {}

    # Iterate over each feature in the GeoJSON
    for feature in geojson_data['features']:
        adm2_en = feature['properties'].get('ADM2_EN', 'unknown')

        if adm2_en not in features_by_adm2_en:
            features_by_adm2_en[adm2_en] = {
                "type": "FeatureCollection",
                "features": []
            }

        # Add the feature to the corresponding ADM2_EN list
        features_by_adm2_en[adm2_en]['features'].append(feature)

    # Write out a GeoJSON file for each ADM2_EN
    for adm2_en, feature_collection in features_by_adm2_en.items():
        output_file_path = os.path.join(output_dir, f"{adm2_en}.json")
        with open(output_file_path, 'w') as out_file:
            json.dump(feature_collection, out_file, indent=4)

    print(f"GeoJSON files have been saved to the '{output_dir}' directory.")

if __name__ == "__main__":
    # Replace 'input.geojson' with the path to your GeoJSON file
    input_geojson_path = 'GeoData/Divisional_geo.json'
    separate_geojson_by_adm2_en(input_geojson_path)
