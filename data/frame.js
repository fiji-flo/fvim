var MODES = {
    normal: Symbol('normal'),
    insert: Symbol('insert'),
};
var mode = MODES.normal;

let emit = x => self.port.emit('fvim:event', x);

var CMDS = {
    scrollTop: () => emit({ cmd: 'scrollTop' }),
    scrollBottom: () => emit({ cmd: 'scrollBottom' }),
    scrollDown: () => emit({ cmd: 'scrollDown' }),
    scrollUp: () => emit({ cmd: 'scrollUp' }),
    scrollLeft: () => emit({ cmd: 'scrollLeft' }),
    scrollRight: () => emit({ cmd: 'scrollRight' }),
    yankUrl: () => emit({ cmd: 'yankUrl', param: window.location.href }),
    newTab: () => emit({ cmd: 'newTab' }),
    openInNewTab: () => emit({ cmd: 'openInNewTab' }),
    setInsertMode: () => mode = MODES.insert,
};
let fG = (ev) => {
    if (mode === MODES.insert) {
        if (ev.key === "Escape") {
            mode = MODES.normal;
        } else {
            return;
        }
    }
    ev.preventDefault();
    ev.stopPropagation();
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
    }
};
addEventListener('keydown', fG, true);
