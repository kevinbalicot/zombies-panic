'use strict';

export const KEY_UP = 38;
export const KEY_DOWN = 40;
export const KEY_LEFT = 37;
export const KEY_RIGHT = 39;
export const KEY_SPACE = 13;
export const LEFT_CLICK = 'left_click';

const gamepad = [];
gamepad[KEY_UP] = false;
gamepad[KEY_DOWN] = false;
gamepad[KEY_LEFT] = false;
gamepad[KEY_RIGHT] = false;
gamepad[KEY_SPACE] = false;
gamepad[LEFT_CLICK] = false;

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    gamepad[e.keyCode] = true;
});

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    gamepad[e.keyCode] = false;
});

document.addEventListener('mousedown', () => {
    gamepad[LEFT_CLICK] = true;
});

document.addEventListener('mouseup', () => {
    gamepad[LEFT_CLICK] = false;
});

export default gamepad;
