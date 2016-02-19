'use strict';

import {Game} from './bin/game';
import {MainScene} from './scenes/main';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from './config/config';
import eventsManager from './services/events-manager';

let meter = new FPSMeter(document.getElementById('fps'), { graph: true, heat: true });
let game = new Game(WINDOW_WIDTH, WINDOW_HEIGHT, { transparent: true, antialias: true });

game.stage = new MainScene();

eventsManager.events.push({ action: 'GAME_OVER', callback: () => {
    game.stop();
    alert('GAME OVER');
}});

eventsManager.events.push({ action: 'WIN', callback: () => {
    game.stop();
    alert('WIN !!!!');
}});


game.ticker.add(() => {
    game.refresh();
    meter.tick();
});

game.start();
document.querySelector('#game').appendChild(game.renderer.view);

/*
let connectionForm = document.querySelector('.connection-form');
connectionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let nickname = document.getElementsByName('nickname').item(0);
});
*/
