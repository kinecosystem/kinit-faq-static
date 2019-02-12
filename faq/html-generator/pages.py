from yattag import Doc, indent
from logging import info
import os
import generators
import index


FOOTER = '<div class="feedback"> <div>Was this helpful?</div> <div class="yes-no"> <div class="btn-halo" id="helpful-yes">Yes</div> <div class="btn-halo" id="helpful-no">No</div> </div> </div> <div class="more-help"> <span class="text">Still need help?</span> <span id="contact-support"> <a class="btn" href="support/contact-us.html">Contact Us</a> </span> </div>'


def generate(json):

    for category in json.keys():
        folder_path = os.path.dirname(
            __file__) + '/../pages/' + index.normalize(category) + "/"

        for sub_category in json[category].keys():
            doc, tag, text, line = Doc().ttl()

            file_path = folder_path + index.normalize(sub_category) + ".html"

            doc.asis('<!DOCTYPE html>')
            with tag('html'):
                doc.asis(generators.generate_header(category))
                with tag('body'):
                    with tag('div', klass='wrapper-text'):
                        with tag('div', klass='header'):
                            with tag('p', id="sub_category"):
                                text(sub_category)
                            doc.asis(
                                '<span class="info">ⓘ</span><span> 05 Sep 18 </span>')
                        with tag('p', klass='text'):
                            doc.asis(json[category][sub_category])
                    doc.asis(FOOTER)
                    doc.asis(generators.footer(json, category, sub_category))

                doc.asis(generators.generate_js_imports())

            with open(file_path, "w+") as file:
                file.write(indent(doc.getvalue()))
