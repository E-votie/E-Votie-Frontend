import re

def clear_href_attributes(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Regex pattern to find href="..." attributes and set them to empty
    pattern = r'*%'
    content = re.sub(pattern, r' ', content)

    with open(file_path, 'w') as file:
        file.write(content)

# Replace 'yourfile.html' with the path to your HTML file
clear_href_attributes('result.json')
