import generators
import index
import contact_us
import pages
import os
import json

with open(os.path.dirname(__file__) + '/../assets/database.json', 'r') as json_file:
    json_data = json.load(json_file)

index.prep_dirs(json_data)
index.generate_index(json_data)
contact_us.generate_cotagory_menu(json_data.keys())
contact_us.generate_cotagory_js(json_data)
pages.generate(json_data)
