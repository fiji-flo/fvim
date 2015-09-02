var self = require("sdk/self");
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var clipboard = require("sdk/clipboard");

let frameScriptUrl = self.data.url('frame.js');
pageMod.PageMod({
    include: "*",
    contentScriptFile: frameScriptUrl,
    contentScriptWhen: "start",
    attachTo: ["existing", "top"],
    onAttach: function(worker) {
        worker.port.on("fGesture:key", function(ev) {
            handleEvent(ev);
        });
    }
});

function handleEvent(key) {
    if (key === 't') {
        console.log(key);
        tabs.open("");
    }
    let action = actions.find(function(value) {
        return value.key == key;
    });
    if (action) {
        runCommand(action.command);
    }
}
