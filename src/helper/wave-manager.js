'use strict';

import {Utils} from './../bin/utils';
import {Player} from './player';
import {Graphics} from './../bin/graphics';
import {DIRECTION_UP} from './../bin/display-object';
import {ZOMBIE, RUNNER, TANKER, ABOMINATION, WAVE} from './../config/config';

export class WaveManager {

    constructor (stage, spawns) {
        this.stage = stage;
        this.spawns = spawns;
        this.level = 1;
        this.speed = 2000;
        this.nbZombiesToSpanw = 5;
        this.zombies = [];
        this.zombiesInGame = [];
        this.spawnable = true;
    }

    createZombie (x, y) {

        let data = this.zombies.shift();
        let zombie = new Player(x, y, data.width, data.height, data.life, data.strength, data.velocity);

        zombie.addChild(Graphics.drawRect(data.color, null, 0, 0, data.width, data.height));
        zombie.initPivot();

        this.zombiesInGame.push(zombie);
        this.stage.addChild(zombie);
    }

    removeZombie (zombie) {
        this.stage.removeChild(zombie);
        this.zombiesInGame.splice(this.zombiesInGame.indexOf(zombie), 1);
    }

    pickASpawn () {
        if (!Array.isArray(this.spawns)) {
            return this.spawns;
        }

        let rand = Math.floor(Math.random() * this.spawns.length);
        return this.spawns[rand];
    }

    refresh () {
        if (this.spawnable &&
            this.zombiesInGame.length <= (this.nbZombiesToSpanw * this.level) &&
            this.zombies.length > 0
        ) {
            let spawn = this.pickASpawn();
            this.createZombie(spawn.x, spawn.y);

            this.spawnable = false;
            setTimeout(() => this.spawnable = true, this.speed);
        }
    }

    isFinished () {
        return this.zombiesInGame.length <= 0 && this.zombies.length <= 0;
    }

    nextWave () {
        let zombies = [];

        for (let i = 0; i < WAVE.zombies * this.level; i++) {
            zombies.push({
                width: ZOMBIE.width,
                height: ZOMBIE.height,
                life: ZOMBIE.life,
                strength: ZOMBIE.strength,
                velocity: ZOMBIE.velocity,
                color: ZOMBIE.color
            })
        }

        for (let i = 0; i < WAVE.runners * this.level; i++) {
            zombies.push({
                width: RUNNER.width,
                height: RUNNER.height,
                life: RUNNER.life,
                strength: RUNNER.strength,
                velocity: RUNNER.velocity,
                color: RUNNER.color
            })
        }

        for (let i = 0; i < WAVE.tankers * this.level; i++) {
            zombies.push({
                width: TANKER.width,
                height: TANKER.height,
                life: TANKER.life,
                strength: TANKER.strength,
                velocity: TANKER.velocity,
                color: TANKER.color
            })
        }

        if (this.level >= 5) {
            for (let i = 0; i < WAVE.abominations * (this.level - 4); i++) {
                zombies.push({
                    width: ABOMINATION.width,
                    height: ABOMINATION.height,
                    life: ABOMINATION.life,
                    strength: ABOMINATION.strength,
                    velocity: ABOMINATION.velocity,
                    color: ABOMINATION.color
                })
            }
        }

        Utils.shuffle(zombies);
        this.zombies = zombies;
        this.spawnable = true
    }
}
