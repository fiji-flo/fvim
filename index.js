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

var actions = {
    scrollLeft: 'cmd_scrollLeft',
    scrollDown: 'cmd_scrollLineDown',
    scrollUp: 'cmd_scrollLineUp',
    scrollRight: 'cmd_scrollRight',
    scrollTop: 'cmd_scrollTop',
    scrollBottom: 'cmd_scrollBottom'
};

function handleEvent(ev) {
    console.log(ev.cmd);
    switch (ev.cmd) {
    case 'newTab': tabs.open('');
        break;
    case 'openInNewTab': tabs.open(clipboard.get());
        break;
    case 'yankUrl': clipboard.set(ev.param, 'text');
        break;
    default: if (ev.cmd in actions) {
        runCommand(actions[ev.cmd]);
    }
    }
}

function runCommand(cmd) {
    console.log(`do ${cmd}`);
    // get the active SDK window
    var windows = require("sdk/windows").browserWindows;
    var activeWindow = windows.activeWindow;

    // convert it to a chrome window
    var browserWindow = require("sdk/view/core").viewFor(activeWindow);
    let controller = browserWindow.document.commandDispatcher.getControllerForCommand(cmd);
    controller.doCommand(cmd);
}
