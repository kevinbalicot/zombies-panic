'use strict';

import {Game} from './bin/game';
import {MainScene} from './scenes/main';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from './config/config';
import eventsManager from './services/events-manager';

let menu = document.querySelector('.menu');
let gameContainer = document.querySelector('.game');
let startButton = document.querySelector('.start-game');
let lifeCounter = document.querySelector('.hud .life');
let meter = new FPSMeter(document.getElementById('fps'), { graph: true, heat: true });
let game = null;
let tickerinitialized = false;

/**
 * Init a new game
 */
function initGame () {
    game = new Game(WINDOW_WIDTH, WINDOW_HEIGHT, { antialias: true });
    game.renderer.backgroundColor = 0xffffff;
    game.stage = new MainScene();

    if (!tickerinitialized) {
        game.ticker.add(() => {
            game.refresh();
            meter.tick();
            lifeCounter.innerHTML = game.stage.player.life;
        });
        tickerinitialized = true;
    }

    gameContainer.className = 'game hidden';
    menu.className = 'menu';
}

/**
 * Start game
 */
function startGame () {
    menu.className = 'menu hidden';
    game.start();
    gameContainer.className = 'game';
    gameContainer.appendChild(game.renderer.view);
}

eventsManager.events.push({ action: 'GAME_OVER', callback: () => {
    game.stop();
    alert('GAME OVER');
    game.renderer.destroy(true);
    initGame();
}});

eventsManager.events.push({ action: 'WIN', callback: () => {
    game.stop();
    alert('WIN !!!!');
    game.renderer.destroy(true);
    initGame();
}});

startButton.addEventListener('click', () => {
    startGame();
});

initGame();
