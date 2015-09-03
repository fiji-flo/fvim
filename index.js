var self = require("sdk/self");
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var clipboard = require('sdk/clipboard');

let frameScriptUrl = self.data.url('frame.js');
pageMod.PageMod({
    include: ["*", "about:*"],
    contentScriptFile: frameScriptUrl,
    contentScriptWhen: "start",
    attachTo: ["existing", "top"],
    onAttach: function(worker) {
        worker.port.on("fvim:event", function(ev) {
            handleEvent(ev);
        });
    }
});

function handleEvent(ev) {
    switch (ev.cmd) {
    case 'newTab': tabs.open('');
        break;
    case 'openInNewTab': tabs.open(clipboard.get());
        break;
    case 'yankUrl': clipboard.set(ev.param, 'text');
        break;
    }
}
