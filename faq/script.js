$(document).ready(() => {

    const faqCategory = $("#category").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();
    const faqSubCategory = $(document).find("title").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();

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
        contactSupport = (data) => {
            console.log(data);
            window.webkit.messageHandlers.contactSupport.postMessage(data)
        };
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
            window.Kinit.contactSupport(data.faqCategory, data.faqSubCategory)
        };
    } else {
        isPageHelpfulSelection = (data) => { }
        pageLoaded = (data) => { }
        contactSupport = (data) => { }
    }

    const callback = {
        isPageHelpfulSelection: (faqCategory, faqSubCategory, isHelpful) => {
            isPageHelpfulSelection({ faqCategory, faqSubCategory, isHelpful })
            $(".yes-no").remove();
            $(".feedback div").text("Thank you for your feedback!")
        },
        pageLoaded: (faqCategory, faqSubCategory) => { pageLoaded({ faqCategory, faqSubCategory }) },
        contactSupport: (faqCategory, faqSubCategory) => { contactSupport({ faqCategory, faqSubCategory }) }
    }


    callback.pageLoaded(faqCategory, faqSubCategory)

    $("#contact-support").click(() => { callback.contactSupport(faqCategory, faqSubCategory) })
    $("#helpful-yes").click(() => { callback.isPageHelpfulSelection(faqCategory, faqSubCategory, true) })
    $("#helpful-no").click(() => { callback.isPageHelpfulSelection(faqCategory, faqSubCategory, false) })

})