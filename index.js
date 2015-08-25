var self = require("sdk/self");
var tabs = require('sdk/tabs');
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");
var utils = require('sdk/window/utils');

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

var actions = [
    {key: 'h', command: 'cmd_scrollLeft'},
    {key: 'j', command: 'cmd_scrollLineDown'},
    {key: 'k', command: 'cmd_scrollLineUp'},
    {key: 'l', command: 'cmd_scrollRight'},
    {key: 'g', command: 'cmd_scrollTop'},
    {key: 'G', command: 'cmd_scrollBottom'}
];

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

function runCommand(cmd) {
    let window = utils.getMostRecentBrowserWindow();
    let controller = window.document.commandDispatcher.getControllerForCommand(cmd);
    controller.doCommand(cmd);
}
