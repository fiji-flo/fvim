let self = require("sdk/self");
let tabs = require('sdk/tabs');
let pageMod = require("sdk/page-mod");
let clipboard = require('sdk/clipboard');

let newTabUrl = 'about:newtab';

let focusUrlBar = () => {
    let windows = require("sdk/windows").browserWindows;
    let activeWindow = windows.activeWindow;

    // convert it to a chrome window
    let browserWindow = require("sdk/view/core").viewFor(activeWindow);
    let urlbar = browserWindow.document.getElementById('urlbar');
    urlbar.select();
};

let focusUrlBarOnNewTab = () => {
    if (tabs.activeTab.url === newTabUrl) {
        focusUrlBar();
    }
};

let handleEvent = ev => {
    switch (ev.cmd) {
    case 'newTab': tabs.open({ url: newTabUrl,
                               onOpen: focusUrlBarOnNewTab });
        break;
    case 'openInNewTab': tabs.open(clipboard.get());
        break;
    case 'yankUrl': clipboard.set(ev.param, 'text');
        break;
    case 'focusUrlBar': focusUrlBar();
        break;
    case 'openInCurrentTab': tabs.activeTab.url = clipboard.get();
        break;
    }
};

let frameScriptUrl = self.data.url('frame.js');
let styleUrl = self.data.url('style.css');
pageMod.PageMod({
    include: [/.*/, /about:.*/],
    contentStyleFile: styleUrl,
    contentScriptFile: frameScriptUrl,
    contentScriptWhen: "start",
    attachTo: ["existing", "top"],
    onAttach: function(worker) {
        worker.port.on("fvim:event", function(ev) {
            handleEvent(ev);
        });
    }
});
