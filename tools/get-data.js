var p = /^[A-Za-z0-9_-]+$/; // Pattern for most names
var q = /^[A-Za-z0-9:_-]+$/; // Pattern for Model names
var m = "names can only be alpha numeric with no spaces";
var store = [];
var lastMessage;
var callback;

// NOTE:
// PROMPT is not designed to do this, so have had to FIDDLE it to make it work
// Would be better to inject Prompt with the facility and work with its own
// internal code, as this code is very messy.

function getData(prompt, message, cb) {
    if (lastMessage != message) {
        lastMessage = message;
        store = [];
        callback = cb
    }

    function worker(err, data) {

        if (typeof data === "object"
            && typeof data.name === "string"
            && data.name.length > 0)
        {
            store.push(data.name);
            getData(prompt, message, worker);
        } else {
            var c = callback;
            callback = undefined;
            c(store);
        }
    }

    prompt.get({
            name: "name",
            description: message,
            required: false,
            pattern: message.indexOf("model-name")>=0 ? q : p,
            message: m
        }, worker
    );
}

module.exports = getData;