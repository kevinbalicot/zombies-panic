'use strict';

import {Scene} from './../bin/scene';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from './../config/config';
import {DIRECTION_UP, DIRECTION_DOWN, DIRECTION_RIGHT, DIRECTION_LEFT} from './../bin/display-object';
import {Player} from './../helper/player';
import {Wall} from './../helper/wall';
import {KEY_UP, KEY_LEFT, KEY_RIGHT, KEY_DOWN, LEFT_CLICK, KEY_N, KEY_B} from './../services/gamepad';
import {Inventory} from './../bin/inventory';
import {Item} from './../bin/item';
import {Graphics} from './../bin/graphics';
import {Gun} from './../helper/weapons/gun';
import {Shotgun} from './../helper/weapons/shotgun';
import {MachineGun} from './../helper/weapons/machine-gun';
import {Wave} from './../helper/wave';
import gamepad from './../services/gamepad';
import eventsManager from './../services/events-manager';
import * as PIXI from 'pixi.js';

export class MainScene extends Scene {

    constructor () {

        super();

        this.zombies = [];
        this.walls = [];
        this.bullets = [];
        this.player = new Player(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 10, 10);
        this.player.addChild(Graphics.drawRect(0xFF3300, null, 0, 0, 10, 10));
        this.player.initPivot();
        this.inventory = new Inventory();
        this.wave = new Wave(
            this,
            [new PIXI.Point(10, 10), new PIXI.Point(WINDOW_WIDTH - 10, 10)]
        );

        let gun = new Gun();
        let shotgun = new Shotgun();
        let machineGun = new MachineGun();
        this.inventory.add(new Item(gun, gun.name));
        this.inventory.add(new Item(machineGun, machineGun.name));
        this.inventory.add(new Item(shotgun, shotgun.name));

        this.player.weapon = this.inventory.getCurrent().object;

        //this.createWall(WINDOW_WIDTH / 4, 150, 100, 100);

        this.addChild(this.player);
    }

    refresh (game) {

        if (gamepad[KEY_UP]) {
            this.player.direction = DIRECTION_UP;
        } else if (gamepad[KEY_DOWN]) {
            this.player.direction = DIRECTION_DOWN;
        } else if (gamepad[KEY_LEFT]) {
            this.player.direction = DIRECTION_LEFT;
        } else if (gamepad[KEY_RIGHT]) {
            this.player.direction = DIRECTION_RIGHT;
        } else {
            this.player.direction = null;
        }

        if (gamepad[KEY_N]) {
            this.player.weapon = this.inventory.getNext().object;
            gamepad[KEY_N] = false;
        }

        if (gamepad[KEY_B]) {
            this.player.weapon = this.inventory.getPreviouse().object;
            gamepad[KEY_B] = false;
        }

        if (gamepad[LEFT_CLICK]) {
            let bullet = this.player.shoot();
            if (!!bullet) {
                this.addBullets(bullet);
            }
        }

        this.wave.refresh();

        this.player.move();
        this.player.follow(game.renderer.plugins.interaction.mouse.global);

        for (let bullet of this.bullets) {
            bullet.move();
            let zombie = game.hasCollisionBetweenObjects(bullet, this.zombies);
            let wall = game.hasCollisionBetweenObjects(bullet, this.walls);

            if (!!zombie) {
                zombie.hite(bullet, bullet.getDamage(), 2);
                this.removeBullet(bullet);
            }

            if (!game.isVisible(bullet) || !!wall) {
                this.removeBullet(bullet);
            }
        }

        for (let zombie of this.zombies) {

            if (zombie.life <= 0) {
                this.wave.removeZombie(zombie);
            }

            let otherZombies = this.zombies.slice();
            otherZombies.splice(otherZombies.indexOf(zombie), 1);
            zombie.move();

            zombie.follow(this.player);
            game.checkBordersCollision(zombie);

            if (!!game.hasCollisionBetweenObjects(this.player, zombie)) {
                this.player.hite(zombie, zombie.strength);
            }

            if (this.player.life < 0 && !game.stopped) {
                eventsManager.emitter.dispatch({ type: 'GAME_OVER' });
            }
        }

        // Check collision bewteen player / monsters and walls
        this.zombies.forEach((zombie) => zombie.checkCollisions(this.walls));
        this.player.checkCollisions(this.walls);

        game.checkBordersCollision(this.player);

        if (this.wave.isFinished()) {
            eventsManager.emitter.dispatch({ type: 'WIN' });
        }
    }

    createWall (x, y, width, height) {
        let wall = new Wall(x, y, width, height);
        wall.addChild(Graphics.drawRect(0xFF3300, null, 0, 0, width, height));
        this.walls.push(wall);

        this.addChild(wall);
    }

    removeBullet (bullet) {
        this.removeChild(bullet);
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
    }

    addBullets (bullets) {
        if (!Array.isArray(bullets)) {
            bullets = [bullets];
        }

        for (let bullet of bullets) {
            this.bullets.push(bullet);
            this.addChild(bullet);
        }
    }
}
