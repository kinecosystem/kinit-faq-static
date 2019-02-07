from yattag import Doc, indent
from logging import info
import os
import generators


def generate_index_menu(json_data):
    info("Generating Index.html Menu")
    doc, tag, text, line = Doc().ttl()

    for category in json_data.keys():
        doc.asis(generate_menu_tab(category, json_data))

    return doc.getvalue()


def generate_menu_tab(category, json_data):
    info("Generating Index.html Menu Tab %s" % category)

    doc, tag, text, line = Doc().ttl()
    with tag('div', klass='tab'):
        doc.stag('input', id=normalize(category), type='checkbox', name='tabs')
        doc.asis('<label for="%s">%s</label>' %
                 (normalize(category), category))
        with tag('div', klass='tab-content'):
            for sub_category in json_data[category].keys():
                doc.asis(generate_menu_tab_links(category, sub_category))

    return doc.getvalue()


def generate_menu_tab_links(category, sub_category):
    info("Generating Index.html Menu Tab Links")

    doc, tag, text, line = Doc().ttl()

    with tag('a', href='./pages/%s/%s.html' % (normalize(category), normalize(sub_category))):
        line('p', sub_category)

    return doc.getvalue()


def generate_index(json_data):
    info("Generating Index.html file")
    doc, tag, text, line = Doc().ttl()

    doc.asis('<!DOCTYPE html>')
    with tag('html'):
        doc.asis(generators.generate_header('FAQ'))
        with tag('body'):
            with tag('div', klass='wrapper'):
                doc.asis(generate_index_menu(json_data))

        doc.asis(generators.generate_js_imports())

    with open(os.path.dirname(__file__) + '/../index.html', "w") as index_file:
        index_file.write(indent(doc.getvalue()))


def normalize(str):
    return str.lower().replace(" ", "_").replace("/", "or").replace("&", "and").replace("’", "")


def prep_dirs(json_data):
    for category in json_data.keys():
        if not os.path.exists(os.path.dirname(__file__) + '/../pages/' + normalize(category)):
            os.makedirs(os.path.dirname(__file__) +
                        '/../pages/' + normalize(category))
