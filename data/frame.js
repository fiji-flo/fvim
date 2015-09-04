var MODES = {
    normal: Symbol('normal'),
    insert: Symbol('insert'),
    auto: Symbol('auto'),
};
var mode = MODES.auto;

let emit = x => self.port.emit('fvim:event', x);

let editable = x =>
    x.tagName === 'INPUT' ||
    x.tagName === 'TEXTAREA' ||
    x.getAttribute('g_editable') === 'true';

var CMDS = {
    scrollTop: () => window.scrollTo(0, 0),
    scrollBottom: () => window.scrollTo(0, window.scrollMaxY),
    scrollDown: () => window.scrollByLines(4),
    scrollUp: () => window.scrollByLines(-4),
    scrollLeft: () => window.scollBy(-40, 0),
    scrollRight: () => window.scollBy(40, 0),
    yankUrl: () => emit({ cmd: 'yankUrl', param: window.location.href }),
    newTab: () => emit({ cmd: 'newTab' }),
    openInNewTab: () => emit({ cmd: 'openInNewTab' }),
    setInsertMode: () => mode = MODES.insert,
    focusUrlBar: () => emit({ cmd: 'focusUrlBar' }),
    openInCurrentTab: () => emit({ cmd: 'openInCurrentTab' }),
};
let fG = (ev) => {
    if (ev.key === "Escape") {
        switch (mode) {
        case MODES.insert: mode = MODES.normal;
            break;
        case MODES.auto: mode = MODES.normal;
            break;
        case MODES.normal: mode = MODES.auto;
            break;
        }
    }

    switch (mode) {
    case MODES.insert: return;
    case MODES.auto: if (editable(ev.target)) return;
    }
    switch (ev.key) {
    case 'g': CMDS.scrollTop();
        break;
    case 'G': CMDS.scrollBottom();
        break;
    case 'j': CMDS.scrollDown();
        break;
    case 'k': CMDS.scrollUp();
        break;
    case 'h': CMDS.scrollLeft();
        break;
    case 'l': CMDS.scrollRight();
        break;
    case 'y': CMDS.yankUrl();
        break;
    case 't': CMDS.newTab();
        break;
    case 'P': CMDS.openInNewTab();
        break;
    case 'i': CMDS.setInsertMode();
        break;
    case 'o': CMDS.focusUrlBar();
        break;
    case 'p': CMDS.openInCurrentTab();
        break;
    }
    ev.preventDefault();
    ev.stopPropagation();
    return;
};
addEventListener('keydown', fG, true);
