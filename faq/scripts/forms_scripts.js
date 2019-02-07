$(document).ready(() => {
    let setup = true

    const urlParam = (name) => {
        const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results != null ? decodeURI(results[1]) || 0 : null;
    }

    const faqCategory = decodeURIComponent(urlParam('category'));
    const faqSubCategory = decodeURIComponent(urlParam('sub_category'));

    window.setMiscFormData = (user_id, platform, version, debug) => {
        $('#user_id').val(user_id)
        $('#platform').val(platform);
        $('#version').val(version);
        $('#debug').val(debug);
    }

    window.submitForm = () => {

        $('#submit-form').hide()
        $('#sending').show()

        host = $('#debug').val() != 'false' ? "https://stage2.kinitapp.com" : "https://api2.kinitapp.com"
        redirect = "https://s3.amazonaws.com/kinapp-static/faq2"
        endpoint = $("#ticket").attr("name") == "contact-us" ? "/contact-us" : "/feedback"
        onSuccessEndpoint = $("#ticket").attr("name") == "contact-us" ? "/support/ticket-submitted.html" : "/support/feedback-submitted.html"
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
                    window.Events.feedbackFormSent()
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

        /** GENERATED CODE */
        switch ($("#category").val()) {
            case "Send Kin":
                $("#sub_category").append($("<option>", { text: "Send Kin to another app" }));
                $("#sub_category").append($("<option>", { text: "Send Kin to a friend" }));
                $("#sub_category").append($("<option>", { text: "Send Kin to / from an exchange walle" }));
                break;
            case "Backup & Restore your Kin":
                $("#sub_category").append($("<option>", { text: "How to backup your account" }));
                $("#sub_category").append($("<option>", { text: "Uninstalling / Reinstalling Kinit" }));
                $("#sub_category").append($("<option>", { text: "Moving to a new device" }));
                $("#sub_category").append($("<option>", { text: "Can’t remember my security answers" }));
                $("#sub_category").append($("<option>", { text: "Can’t find the email with the QR code" }));
                break;
            case "Earn Kin":
                $("#sub_category").append($("<option>", { text: "Settings / Preferences" }));
                $("#sub_category").append($("<option>", { text: "Not receiving a reward" }));
                $("#sub_category").append($("<option>", { text: "Answer submission" }));
                $("#sub_category").append($("<option>", { text: "Not getting new activities" }));
                break;
            case "Gift Cards":
                $("#sub_category").append($("<option>", { text: "Specific offer disappeared / out of stock" }));
                $("#sub_category").append($("<option>", { text: "Code is missing after payment" }));
                $("#sub_category").append($("<option>", { text: "Incorrect code" }));
                $("#sub_category").append($("<option>", { text: "Buy only with Kin earned on Kinit" }));
                break;
            case "My Kin Balance":
                $("#sub_category").append($("<option>", { text: "Incorrect Kin balance" }));
                break;
            case "Other":
                $("#sub_category").append($("<option>", { text: "Report a bug" }));
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