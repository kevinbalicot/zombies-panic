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
import {WaveManager} from './../helper/wave-manager';
import {MedicPack} from './../helper/objects/medic-pack';
import {AmmoPack} from './../helper/objects/ammo-pack';
import {WeaponPack} from './../helper/objects/weapon-pack';
import {Utils} from './../bin/utils';
import gamepad from './../services/gamepad';
import eventsManager from './../services/events-manager';
import loader from './../services/loader';
import * as PIXI from 'pixi.js';

export class MainScene extends Scene {

    constructor () {

        super();

        this.score = 0;
        this.walls = [];
        this.bullets = [];
        this.objects = [];
        this.player = new Player(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 10, 10);
        this.player.addChild(Graphics.drawRect(0xFF3300, null, 0, 0, 10, 10));
        this.player.initPivot();
        this.waitingNextWave = false;
        this.wave = new WaveManager(
            this,
            [new PIXI.Point(10, 10), new PIXI.Point(WINDOW_WIDTH - 10, 10)]
        );

        this.wave.nextWave();

        let inventory = new Inventory();
        let gun = new Gun();
        inventory.add(new Item(gun, gun.name));
        this.player.inventory = inventory;

        this.addChild(this.player);

        setInterval(() => this.createAmmoPack(), 1 * 60 * 1000);
        setInterval(() => this.createMedicPack(), 2 * 60 * 1000);
        setInterval(() => this.createWeaponPack(), 3 * 60 * 1000);
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
            this.player.inventory.getNext().object;
            gamepad[KEY_N] = false;
        }

        if (gamepad[KEY_B]) {
            this.player.inventory.getPreviouse().object;
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

        let object = game.hasCollisionBetweenObjects(this.player, this.objects);

        if (!!object) {
            object.take(this.player);
            this.removeObject(object);
        }

        for (let bullet of this.bullets) {
            bullet.move();
            let zombie = game.hasCollisionBetweenObjects(bullet, this.wave.zombiesInGame);
            let wall = game.hasCollisionBetweenObjects(bullet, this.walls);

            if (!!zombie) {
                zombie.hite(bullet, bullet.getDamage(), 2);
                this.removeBullet(bullet);
                this.score += bullet.getDamage();
            }

            if (!game.isVisible(bullet) || !!wall) {
                this.removeBullet(bullet);
            }
        }

        for (let zombie of this.wave.zombiesInGame) {

            if (zombie.life <= 0) {
                this.wave.removeZombie(zombie);
                this.score += zombie.maxLife * zombie.strength;
            }

            let otherZombies = this.wave.zombiesInGame.slice();
            otherZombies.splice(otherZombies.indexOf(zombie), 1);
            zombie.move();

            zombie.follow(this.player);
            game.checkBordersCollision(zombie);

            if (!!game.hasCollisionBetweenObjects(this.player, zombie)) {
                this.player.hite(zombie, zombie.strength);
            }

            if (this.player.life <= 0 && !game.stopped) {
                eventsManager.emitter.dispatch({ type: 'GAME_OVER' });
            }
        }

        // Check collision bewteen player / monsters and walls
        this.wave.zombiesInGame.forEach((zombie) => zombie.checkCollisions(this.walls));
        this.player.checkCollisions(this.walls);

        game.checkBordersCollision(this.player);

        if (this.wave.isFinished() && !this.waitingNextWave) {
            this.wave.level++;
            this.waitingNextWave = true;

            this.createAmmoPack();
            this.createMedicPack();

            setTimeout(() => {
                this.wave.nextWave();
                this.waitingNextWave = false;
            }, 5000);
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

    createMedicPack () {
        let x = WINDOW_WIDTH / 2 + Utils.random(1, 100, true);
        let y = WINDOW_HEIGHT / 2 + Utils.random(1, 100, true);
        let medicPack = new MedicPack(x, y, 20, 20, loader.resources['medic-pack'].texture);
        this.objects.push(medicPack);
        this.addChild(medicPack);

        setTimeou(() => this.removeObject(medicPack), 10 * 1000);
    }

    createAmmoPack () {
        let x = WINDOW_WIDTH / 2 + Utils.random(1, 100, true);
        let y = WINDOW_HEIGHT / 2 + Utils.random(1, 100, true);
        let ammoPack = new AmmoPack(x, y, 20, 20, loader.resources['ammo-pack'].texture);
        this.objects.push(ammoPack);
        this.addChild(ammoPack);

        setTimeou(() => this.removeObject(ammoPack), 10 * 1000);
    }

    createWeaponPack () {
        let x = WINDOW_WIDTH / 2 + Utils.random(1, 100, true);
        let y = WINDOW_HEIGHT / 2 + Utils.random(1, 100, true);
        let weaponPack = new WeaponPack(x, y, 20, 20, loader.resources['weapon-pack'].texture);
        this.objects.push(weaponPack);
        this.addChild(weaponPack);

        setTimeou(() => this.removeObject(weaponPack), 10 * 1000);
    }

    removeObject (object) {
        this.removeChild(object);
        this.objects.splice(this.objects.indexOf(object), 1);
    }
}
