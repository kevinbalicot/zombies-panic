'use strict';

import * as PIXI from 'pixi.js';
import {Scene} from './scene';

export class Game {

    constructor (windowWidth, windowHeight, options = {}) {

        this.renderer = new PIXI.WebGLRenderer(windowWidth, windowHeight, options);
        this.ticker = PIXI.ticker.shared;
        this.ticker.autoStart = false; //WTF doesn't work ?
        this.ticker.stop();
        this.stopped = true;
        this.stage = null;
        this.window = {
            width: windowWidth,
            height: windowHeight
        }
    }

    refresh () {
        if (!!this.stage) {
            this.stage.refresh(this);
        }

        this.renderer.render(this.stage);
    }

    start () {
        this.ticker.start();
        this.stopped = false;
    }

    stop () {
        this.ticker.stop();
        this.stopped = true;
    }

    reset () {
        this.renderer.destroy();
    }

    checkBordersCollision (object) {

        let hitbox = object.getHitbox();

        if (hitbox.y < 0) {
            object.y = object.pivot.y;
        }

        if (hitbox.x < 0) {
            object.x = object.pivot.x;
        }

        if (hitbox.y + hitbox.height > this.window.height) {
            object.y = this.window.height - hitbox.height + object.pivot.y;
        }

        if (hitbox.x + hitbox.width > this.window.width) {
            object.x = this.window.width - hitbox.width + object.pivot.x;
        }
    }

    hasCollisionBetweenObjects (object1, objects) {

        let object1Hitbox = object1.getHitbox();
        let object2Hitbox = null;

        if (!Array.isArray(objects)) {
            objects = [objects];
        }

        for (let object2 of objects) {

            object2Hitbox = object2.getHitbox();

            if (object2Hitbox.contains(object1Hitbox.x, object1Hitbox.y) ||
                object2Hitbox.contains(object1Hitbox.x + object1Hitbox.width, object1Hitbox.y) ||
                object2Hitbox.contains(object1Hitbox.x, object1Hitbox.y + object1Hitbox.height) ||
                object2Hitbox.contains(object1Hitbox.x + object1Hitbox.width, object1Hitbox.y + object1Hitbox.height)
            ) {
                return object2;
            }
        }

        return null;
    }

    isVisible (object) {

        let hitbox = object.getHitbox();

        if (hitbox.y < 0) {
            return false;
        }

        if (hitbox.x < 0) {
            return false;
        }

        if (hitbox.y + hitbox.height > this.window.height) {
            return false
        }

        if (hitbox.x + hitbox.width > this.window.width) {
            return false;
        }

        return true;
    }
}
