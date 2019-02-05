$(document).ready(() => {

    const faqSubCategory = $("#sub_category").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();
    const faqCategory = $(document).find("title").text().replace(/(\r\n\t|\n|\r\t)/gm, "").trim();


    if ($("#contact-support a").length > 0 && faqCategory != "" && faqSubCategory != "") {
        let link = $("#contact-support a").attr("href")
        $("#contact-support a").attr("href", link + "?category=" + encodeURIComponent(faqCategory) + "&sub_category=" + encodeURIComponent(faqSubCategory))
        $("#contact-support a").click(() => {
            Events.contactSupport({ faqCategory, faqSubCategory })
        })
    }
    if (typeof Events !== "undefined") {
        Events.pageLoaded({ faqCategory, faqSubCategory })
        $("#helpful-yes").click(() => {
            Events.isPageHelpfulSelection({ faqCategory, faqSubCategory, isHelpful: true })
        })
        $("#helpful-no").click(() => {
            Events.isPageHelpfulSelection({ faqCategory, faqSubCategory, isHelpful: false })
        })
    }
    $("#helpful-yes, #helpful-no").click(() => {
        $(".yes-no").remove();
        $(".feedback div").text("Thank you for your feedback!")
    })
})