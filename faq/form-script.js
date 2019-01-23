$(document).ready(() => {
    $('#sending').hide()
    let setup = true;
    let showSubmissionError

    $.urlParam = (name) => {
        const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results != null ? decodeURI(results[1]) || 0 : null;
    }
    $.setMiscData = (user_id, platform, version, debug) => {
        $('#user_id').val(user_id)
        $('#platform').val(platform)
        $('#version').val(version)
        $('#debug').val(debug)
    }


    $.submitForm = (form_id, endpoint, onSuccessEndpoint) => {
        event != undefined ? event.preventDefault() : null;
        $('#submit-form').hide()
        $('#sending').show()
        host = $('#debug').val() != 'false' ? "https://stage2.kinitapp.com" : "https://api2.kinitapp.com"
        redirect = "https://s3.amazonaws.com/kinapp-static/faq2"
        data = $(form_id).serializeObject()
        $.ajax({
            url: host + endpoint,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(data),
            success: (result) => {
                result.status == "ok" ? window.location.replace(redirect + onSuccessEndpoint) : showSubmissionError({ "data": $("#support-data").serialize(), "error": result })
                $('#submit-form').show()
                $('#sending').hide()
            },
            error: (xhr, resp, text) => {
                $('#submit-form').show()
                $('#sending').hide()
                showSubmissionError({ "data": $(form_id).serialize(), "error": text })
            }
        })
    }


    if (window.webkit != undefined) {
        showSubmissionError = (data) => {
            window.webkit.messageHandlers.formSubmitted.postMessage(data)
        };
    } else if (window.Kinit != undefined) {
        showSubmissionError = (data) => {
            Kinit.showSubmissionError(data)
        };
    } else {
        showSubmissionError = (data) => { }
    }

    $('#support-data').submit((event) => { $.submitForm('#support-data', '/contact-us', '/ticket-submitted.html') });
    $('#feedback-data').submit((event) => { $.submitForm('#feedback-data', '/feedback', '/feedback-submitted.html') });

    $('#description').click(function () {
        $(this).attr("placeholder", "")
    })

    const category = decodeURIComponent($.urlParam('category'));
    const sub_category = decodeURIComponent($.urlParam('sub_category'));

    $("#category").change(() => {
        $("#sub_category").find('option').remove()
        $("#sub_category").append($('<option>', { value: "null", text: '- choose -' }))

        switch ($("#category").val()) {
            case "Backup & Restore":
                $("#sub_category").append($('<option>', { value: "How to backup your account", text: "How to backup your account" }))
                $("#sub_category").append($('<option>', { value: "Uninstalling / Reinstalling the app", text: "Uninstalling / Reinstalling the app" }))
                $("#sub_category").append($('<option>', { value: "Moving to a new device", text: "Moving to a new device" }))
                break;
            case "Earn Activities":
                $("#sub_category").append($('<option>', { value: "Not getting new activities", text: "Not getting new activities" }))
                $("#sub_category").append($('<option>', { value: "Not getting a reward", text: "Not getting a reward" }))
                $("#sub_category").append($('<option>', { value: "Settings / Preferences", text: "Settings / Preferences" }))
                $("#sub_category").append($('<option>', { value: "Moving to a new device", text: "Moving to a new device" }))
                break;
            case "Gift Cards":
                $("#sub_category").append($('<option>', { value: "Code is missing after payment", text: "Code is missing after payment" }))
                $("#sub_category").append($('<option>', { value: "Specific offer disappeared", text: "Specific offer disappeared" }))
                break;
            case "Invite Friends":
                $("#sub_category").append($('<option>', { value: "How to invite friends", text: "How to invite friends" }))
                $("#sub_category").append($('<option>', { value: "Referral Program", text: "Referral Program" }))
                break;
            case "Transferring Kin":
                $("#sub_category").append($('<option>', { value: "Transferring Kin to another Kin app", text: "Transferring Kin to another Kin app" }))
                $("#sub_category").append($('<option>', { value: "Transferring Kin to / from an exchange wallet", text: "Transferring Kin to / from an exchange wallet" }))
            case "Other":
                $("#sub_category").append($('<option>', { value: "On-boarding error", text: "On-boarding error" }))
                break;
        }
        if (setup)
            sub_category != null ? $("#sub_category").val(sub_category) : $("#sub_category").val("null")
    })

    category != null ? $("#category").val(category).trigger('change') : $("#category").val("null")
    setup = false
})
