$(document).ready(() => {
    let setup = true

    const urlParam = (name) => {
        const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results != null ? decodeURI(results[1]) || 0 : null;
    }

    const faqCategory = decodeURIComponent(urlParam('category'));
    const faqSubCategory = decodeURIComponent(urlParam('sub_category'));

    window.submitForm = () => {

        $('#submit-form').hide()
        $('#sending').show()

        host = $('#debug').val() != 'false' ? "https://stage2.kinitapp.com" : "https://api2.kinitapp.com"
        redirect = "https://s3.amazonaws.com/kinapp-static/faq2"
        endpoint = $("#ticket").attr("name") == "contact-us" ? "/contact-us" : "/feedback"
        onSuccessEndpoint = $("#ticket").attr("name") == "contact-us" ? "/ticket-submitted.html" : "/feedback-submitted.html"
        data = $("#ticket").serializeObject()

        $.ajax({
            url: host + endpoint,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data),
            success: (result) => {
                if (endpoint == '/contact-us') {
                    window.Events.supportRequestSent({ faqCategory, faqSubCategory })
                } else if (endpoint == '/feedback') {
                    window.Events.feedbackRequestSent()
                }
                window.location.replace(redirect + onSuccessEndpoint)
            },
            error: (xhr, resp, text) => {
                window.Events.showSubmissionError({ "data": $("#ticket").serialize(), "error": text })
            },
            complete: () => {
                $('#submit-form').show()
                $('#sending').hide()
            }
        })
    }

    $('#ticket').submit((event) => {
        event != undefined ? event.preventDefault() : null;
        $("#ticket").attr("name") == "contact-us" ? window.Events.supportSubmitted({ faqCategory, faqSubCategory }) : window.Events.feedbackSubmitted()
        submitForm()
    })

    $('#description').click(function () {
        $(this).attr("placeholder", "")
    })


    $("#category").change(() => {
        $("#sub_category").find('option').remove()
        $("#sub_category").append($('<option>', { text: '- choose -' }))

        switch ($("#category").val()) {
            case "Backup & Restore":
                $("#sub_category").append($('<option>', { text: "How to backup your account" }))
                $("#sub_category").append($('<option>', { text: "Uninstalling / Reinstalling the app" }))
                $("#sub_category").append($('<option>', { text: "Moving to a new device" }))
                break;
            case "Earn Activities":
                $("#sub_category").append($('<option>', { text: "Not getting new activities" }))
                $("#sub_category").append($('<option>', { text: "Not getting a reward" }))
                $("#sub_category").append($('<option>', { text: "Settings / Preferences" }))
                $("#sub_category").append($('<option>', { text: "Moving to a new device" }))
                break;
            case "Gift Cards":
                $("#sub_category").append($('<option>', { text: "Code is missing after payment" }))
                $("#sub_category").append($('<option>', { text: "Specific offer disappeared" }))
                break;
            case "Invite Friends":
                $("#sub_category").append($('<option>', { text: "How to invite friends" }))
                $("#sub_category").append($('<option>', { text: "Referral Program" }))
                break;
            case "Transferring Kin":
                $("#sub_category").append($('<option>', { text: "Transferring Kin to another Kin app" }))
                $("#sub_category").append($('<option>', { text: "Transferring Kin to / from an exchange wallet" }))
            case "Other":
                $("#sub_category").append($('<option>', { text: "On-boarding error" }))
                break;
        }

        $("#sub_category option").each(function () {
            $(this).val($(this).text())
        })

        if (setup) {
            faqSubCategory != null ? $("#sub_category").val(faqSubCategory) : $("#sub_category").val("- choose -")
            setup = false
        }

    })

    $("#category option").each(function () {
        $(this).val($(this).text())
    })

    faqCategory != null ? $("#category").val(faqCategory).trigger('change') : $("#category").val("- choose -")
})