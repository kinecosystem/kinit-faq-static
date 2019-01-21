$(document).ready(() => {
    $.urlParam = (name) => {
        const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results != null ? decodeURI(results[1]) || 0 : null;
    }

    const category = $.urlParam('category')
    const sub_category = $.urlParam('sub_category')

    $("#category").val(category)
    $("#sub_category").val(sub_category)

    $('#description').click(function () {
        $(this).attr("placeholder", "")
    })

    const setMiscData = (user_id, platform, version) => {
        $('#user-id').val(user_id)
        $('#platform').val(platform)
        $('#version').val(version)
    }
})
