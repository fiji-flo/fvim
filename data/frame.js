function scrollTop() {
    window.scrollTo(0, 0);
}
function scrollBottom() {
    window.scrollTo(0, window.scrollMaxY);
}
function scrollDown() {
    window.scrollByLines(1);
}
function scrollUp() {
    window.scrollByLines(-1);
}
function scrollLeft() {
    window.scrollBy(-20, 0);
}
function scrollRight() {
    window.scrollBy(20, 0);
}
function yankUrl() {
    self.port.emit('fGesture:event', { cmd: 'yankUrl', param: window.location.href });
}
function newTab() {
    self.port.emit('fGesture:event', { cmd: 'newTab' });
}
function openInNewTab() {
    self.port.emit('fGesture:event', { cmd: 'openInNewTab' });
}
let fG = (ev) => {
    switch (ev.key) {
    case 'g': scrollTop();
        break;
    case 'G': scrollBottom();
        break;
    case 'j': scrollDown();
        break;
    case 'k': scrollUp();
        break;
    case 'h': scrollLeft();
        break;
    case 'l': scrollRight();
        break;
    case 'y': yankUrl();
        break;
    case 't': newTab();
        break;
    case 'P': openInNewTab();
        break;
    }
};
addEventListener('keydown', fG, true);
