$(document).ready(() => {

    const faqCategory = $("#category").text();
    const faqTitle = $(document).find("title").text();
    const backBtn = $("#backBtn").click(() => window.history.back())

    let isPageHelpfulSelection, pageLoaded, contactSupport
    if (window.webkit != undefined) {
        isPageHelpfulSelection = (data) => window.webkit.messageHandlers.isPageHelpfulSelection.postMessage(data);
        pageLoaded = (data) => window.webkit.messageHandlers.pageLoaded.postMessage(data);
        contactSupport = (data) => window.webkit.messageHandlers.contactSupport.postMessage(data);
    } else if (window.Kinit != undefined) {
        isPageHelpfulSelection = (data) => Kinit.isPageHelpfulSelection(data.faqCategory, data.faqTitle, data.isHelpful);
        pageLoaded = (data) => window.Kinit.pageLoaded(data.faqCategory, data.faqTitle);
        contactSupport = (data) => window.Kinit.contactSupport(data.faqCategory, data.faqTitle);
    } else {
        isPageHelpfulSelection = (data) => { }
        pageLoaded = (data) => { }
        contactSupport = (data) => { }
    }

    const callback = {
        isPageHelpfulSelection: (faqCategory, faqTitle, isHelpful) => {
            console.log("isPageHelpfulSelection")
            console.log({ faqCategory, faqTitle, isHelpful })
            isPageHelpfulSelection({ faqCategory, faqTitle, isHelpful });
        },

        pageLoaded: (faqCategory, faqTitle) => {
            console.log("pageLoaded")
            console.log({ faqCategory, faqTitle })
            pageLoaded({ faqCategory, faqTitle });
        },

        contactSupport: (faqCategory, faqTitle) => {
            console.log("contactSupport")
            console.log({ faqCategory, faqTitle })
            contactSupport({ faqCategory, faqTitle });
        }
    }


    callback.pageLoaded(faqCategory, faqTitle)

    $("#contact-support").click(() => callback.contactSupport(faqCategory, faqTitle))
    $("#helpful-yes").click(() => callback.isPageHelpfulSelection(faqCategory, faqTitle, true))
    $("#helpful-no").click(() => callback.isPageHelpfulSelection(faqCategory, faqTitle, false))
})