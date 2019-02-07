import os
from yattag import Doc, indent

GEN_CODE_HTML = "<!-- GENERATED CODE -->"
GEN_CODE_JS = "/** GENERATED CODE */"


def generate_cotagory_menu(category_list):
    doc, tag, text, line = Doc().ttl()

    line('option', '- choose -')
    for category in category_list:
        with tag('option'):
            doc.asis(category)

    with open(os.path.dirname(__file__) + '/templates/contact-us.html', "r") as template_file:
        buf = template_file.readlines()

    with open(os.path.dirname(__file__) + '/../support/contact-us.html', "w") as contact_us:
        for line in buf:
            if GEN_CODE_HTML in line:
                line = doc.getvalue() + "\n"
            contact_us.write(line)
    with open(os.path.dirname(__file__) + '/../support/contact-us.html', "r") as contact_us:
        data = contact_us.read()
    with open(os.path.dirname(__file__) + '/../support/contact-us.html', "w") as contact_us:
        contact_us.write(indent(data))


def generate_cotagory_js(json):
    javascript = 'switch ($("#category").val()) {\n'
    for category in json.keys():
        javascript += '\t\t\tcase "' + category + '":\n'
        for sub_category in json[category].keys():
            javascript += '\t\t\t\t$("#sub_category").append($("<option>", { text: "' + \
                sub_category + '"}));\n'
        javascript += '\t\t\tbreak;\n'
    javascript += '\t\t}'

    with open(os.path.dirname(__file__) + '/templates/forms_scripts.js', "r") as template_file:
        buf = template_file.readlines()

    with open(os.path.dirname(__file__) + '/../scripts/forms_scripts.js', "w") as contact_us:
        for line in buf:
            if GEN_CODE_JS in line:
                line = line + "\t\t" + javascript
            contact_us.write(line)
