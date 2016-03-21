'use strict';

import {Player} from './player';
import {Graphics} from './../bin/graphics';
import {DIRECTION_UP} from './../bin/display-object';

export class Wave {

    constructor (game, spawns, nbZombies = 50) {
        this.game = game;
        this.spawns = spawns;
        this.nbZombies = nbZombies;
        this.nbZombiesInGame = 0;
        this.spawnable = true;
    }

    createZombie (x, y) {
        let size = (Math.random() * 20) + 10;
        let zombie = new Player(x, y, size, size);
        zombie.strength = 2;
        zombie.life = 20;
        zombie.velocity = 1;

        zombie.addChild(Graphics.drawRect(0x38c429, null, 0, 0, size, size));
        zombie.initPivot();

        this.nbZombies--;
        this.nbZombiesInGame++;

        this.game.zombies.push(zombie);
        this.game.addChild(zombie);
    }

    removeZombie (zombie) {
        this.game.removeChild(zombie);
        this.game.zombies.splice(this.game.zombies.indexOf(zombie), 1);
        this.nbZombiesInGame--;
    }

    pickASpawn () {
        if (!Array.isArray(this.spawns)) {
            return this.spawns;
        }

        let rand = Math.floor(Math.random() * this.spawns.length);
        return this.spawns[rand];
    }

    refresh () {
        if (this.spawnable && this.nbZombiesInGame <= 10 && this.nbZombies > 0) {
            let spawn = this.pickASpawn();
            this.createZombie(spawn.x, spawn.y);

            this.spawnable = false;
            setTimeout(() => this.spawnable = true, 2000);
        }
    }

    isFinished () {
        return this.nbZombiesInGame <= 0 && this.nbZombies <= 0;
    }
}
