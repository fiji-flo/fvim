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
    default: self.port.emit('fGesture:key', ev.key);
    }
};
addEventListener('keydown', fG, true);
