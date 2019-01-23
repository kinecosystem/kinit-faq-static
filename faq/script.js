$(document).ready(() => {

    const faqSubCategory = $("#sub_category").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();
    const faqCategory = $(document).find("title").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();

    let isPageHelpfulSelection, pageLoaded, contactSupport
    if (window.webkit != undefined) {
        isPageHelpfulSelection = (data) => {
            console.log(data);
            window.webkit.messageHandlers.isPageHelpfulSelection.postMessage(data)
        };
        pageLoaded = (data) => {
            console.log(data);
            window.webkit.messageHandlers.pageLoaded.postMessage(data)
        };
        contactSupport = () => {
            window.webkit.messageHandlers.contactSupport.postMessage()
        }
    } else if (window.Kinit != undefined) {
        isPageHelpfulSelection = (data) => {
            console.log(data);
            Kinit.isPageHelpfulSelection(data.faqCategory, data.faqSubCategory, data.isHelpful)
        };
        pageLoaded = (data) => {
            console.log(data);
            window.Kinit.pageLoaded(data.faqCategory, data.faqSubCategory)
        };
        contactSupport = (data) => {
            console.log(data);
            window.Kinit.contactSupport()
        }
    } else {
        isPageHelpfulSelection = () => { }
        pageLoaded = () => { }
        contactSupport = () => { }
    }

    const callback = {
        isPageHelpfulSelection: (faqCategory, faqSubCategory, isHelpful) => {
            isPageHelpfulSelection({ faqCategory, faqSubCategory, isHelpful })
            $(".yes-no").remove();
            $(".feedback div").text("Thank you for your feedback!")
        },
        pageLoaded: (faqCategory, faqSubCategory) => { pageLoaded({ faqCategory, faqSubCategory }) },
        contactSupport: () => { contactSupport() }
    }

    if ($("#contact-support a").length > 0 && faqCategory != "" && faqSubCategory != "") {
        let link = $("#contact-support a").attr("href")
        $("#contact-support a").attr("href", link + "?category=" + encodeURIComponent(faqCategory) + "&sub_category=" + encodeURIComponent(faqSubCategory))
    }


    callback.pageLoaded(faqCategory, faqSubCategory)
    $("#helpful-yes").click(() => { callback.isPageHelpfulSelection(faqCategory, faqSubCategory, true) })
    $("#helpful-no").click(() => { callback.isPageHelpfulSelection(faqCategory, faqSubCategory, false) })

})