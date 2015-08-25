let fG = (ev) => {
    self.port.emit('fGesture:key', ev.key);
};
addEventListener('keydown', fG, true);
