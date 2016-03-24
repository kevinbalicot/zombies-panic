'use strict';

import {Game} from './bin/game';
import {MainScene} from './scenes/main';
import {WINDOW_WIDTH, WINDOW_HEIGHT, ASSETS} from './config/config';
import eventsManager from './services/events-manager';
import loader from './services/loader';

let menu = document.querySelector('.menu');
let gameContainer = document.querySelector('.game');
let startButton = document.querySelector('.start-game');
let lifeCounter = document.querySelector('.hud .life');
let ammoCounter = document.querySelector('.hud .ammo');
let weaponIcon = document.querySelector('.hud .weapon');
let levelCounter = document.querySelector('.hud .level');
let scoreCounter = document.querySelector('.hud .score');
let meter = new FPSMeter(document.getElementById('fps'), { graph: true, heat: true });
let game = null;
let tickerinitialized = false;
let gameIsReady = false;
loader.on('complete', (loader) => {
    startButton.style.display = 'block';
    gameIsReady = true;
});
loader.loadAssets(ASSETS);

/**
 * Init a new game
 */
function initGame () {
    game = new Game(WINDOW_WIDTH, WINDOW_HEIGHT, { antialias: true });
    game.renderer.backgroundColor = 0xffffff;

    if (gameIsReady) {
        startButton.style.display = 'block';
    }

    if (!tickerinitialized) {
        game.ticker.add(() => {
            let weaponState = game.stage.player.weapon.state();
            game.refresh();
            meter.tick();
            weaponIcon.setAttribute('src', weaponState.icon);
            lifeCounter.innerHTML = game.stage.player.life;
            ammoCounter.innerHTML = `${weaponState.loaderState} / ${weaponState.loader} - ${weaponState.ammo}`;
            levelCounter.innerHTML = game.stage.wave.level;
            scoreCounter.innerHTML = game.stage.score;
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
    game.stage = new MainScene();
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
