$(document).ready(() => {
    window.Events = {}

    if (window.Kinit !== undefined) {
        // get only functions
        let interfaces = Object.getOwnPropertyNames(window.Kinit).filter(f => typeof window.Kinit[f] === 'function').values()

        // build event object
        for (const name of interfaces) {
            window.Events[name] = (data) => {
                if (data != null)
                    window.Kinit[name](JSON.stringify(data))
                else
                    window.Kinit[name]()
            }
        }
    }
    else if (window.webkit !== undefined) {
        let interfaces = ["contactSupport", "supportSubmitted", "supportRequestSent", "showSubmissionError", "pageLoaded", "isPageHelpfulSelection"]

        // build event object
        for (const name of interfaces) {
            window.Events[name] = (data) => {
                if (data != null)
                    window.webkit.messageHandlers[name].postMessage(data)
            }
        }
    }

})
