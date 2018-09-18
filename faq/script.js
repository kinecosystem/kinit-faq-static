$(document).ready(() => {

    const faqCategory = $("#category").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();
    const faqTitle = $(document).find("title").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();
    const backBtn = $("#backBtn").click(() => window.history.back())

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
            Kinit.isPageHelpfulSelection(data.faqCategory, data.faqTitle, data.isHelpful)
        };
        pageLoaded = (data) => {
            console.log(data);
            window.Kinit.pageLoaded(data.faqCategory, data.faqTitle)
        };
        contactSupport = (data) => {
            console.log(data);
            window.Kinit.contactSupport(data.faqCategory, data.faqTitle)
        };
    } else {
        isPageHelpfulSelection = (data) => { }
        pageLoaded = (data) => { }
        contactSupport = (data) => { }
    }

    const callback = {
        isPageHelpfulSelection: (faqCategory, faqTitle, isHelpful) => { isPageHelpfulSelection({ faqCategory, faqTitle, isHelpful }) },
        pageLoaded: (faqCategory, faqTitle) => { pageLoaded({ faqCategory, faqTitle }) },
        contactSupport: (faqCategory, faqTitle) => { contactSupport({ faqCategory, faqTitle }) }
    }


    callback.pageLoaded(faqCategory, faqTitle)

    $("#contact-support").click(() => { callback.contactSupport(faqCategory, faqTitle) })
    $("#helpful-yes").click(() => { callback.isPageHelpfulSelection(faqCategory, faqTitle, true) })
    $("#helpful-no").click(() => { callback.isPageHelpfulSelection(faqCategory, faqTitle, false) })
})