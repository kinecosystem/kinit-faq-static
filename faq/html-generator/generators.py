"""
This is a file generator for Kinit FAQ

The code will traverse through content.json, 
creating a folder for every top element (category)
with file (small-case underscored) with the text 
and will wrap it in html template
every page will be linked to others in the same category

"""


from yattag import Doc, indent
from logging import info
import index
import os


def footer(json, category, sub_category):
    doc, tag, text, line = Doc().ttl()

    # get onther links in that category
    links = [s for s in json[category].keys() if s != sub_category]

    for link in links:
        with tag('div', klass='tab-content visable'):
            href = 'pages/%s/%s.html' % (index.normalize(category),
                                         index.normalize(link))
            with tag('a', href=href):
                line('p', link)

    return doc.getvalue()


def generate_js_imports():
    info("Generating JS script tags")

    doc, tag, text, line = Doc().ttl()
    with tag('script', src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"):
        doc.asis("")
    with tag('script', src="./scripts/interfaces.js"):
        doc.asis("")
    with tag('script', src="./scripts/faq_scripts.js"):
        doc.asis("")
    return doc.getvalue()


def generate_header(title):
    info("Generating HEAD tag and meta tags")
    doc, tag, text, line = Doc().ttl()

    with tag('head'):
        doc.stag(
            'base', href="https://cdn.kinitapp.com/faq2/")
        doc.stag('meta', charset='utf-8')
        doc.stag('meta', name="viewport",
                 content="width=device-width, initial-scale=1.0")
        doc.stag('link', rel="stylesheet",
                 href="https://unpkg.com/normalize.css@8.0.0/normalize.css")
        doc.stag('link', rel="stylesheet",
                 href="https://fonts.googleapis.com/css?family=Roboto:300,500")
        doc.stag('link', rel="stylesheet",
                 href="https://use.fontawesome.com/releases/v5.3.1/css/all.css")
        doc.stag('link', rel="stylesheet", href="./assets/style.css")
        with tag('title'):
            text(title)

    return doc.getvalue()
