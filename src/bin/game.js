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

        if (object.y - object.hitbox.height < 0) {
            object.y = object.hitbox.height;
        }

        if (object.y + object.hitbox.height > this.window.height) {
            object.y = this.window.height - object.hitbox.height;
        }

        if (object.x + object.hitbox.width > this.window.width) {
            object.x = this.window.width - object.hitbox.width;
        }

        if (object.x - object.hitbox.width < 0) {
            object.x = object.hitbox.width;
        }
    }

    hasCollisionBetweenObjects (object1, objects) {

        if (!Array.isArray(objects)) {
            objects = [objects];
        }

        for (let object2 of objects) {
            if (object1.x <= object2.x + object2.hitbox.width &&
                (object1.x + object1.hitbox.width) >= object2.x &&
                object1.y <= (object2.y + object2.hitbox.height) &&
                (object1.y + object1.hitbox.height) >= object2.y
            ) {
                return object2;
            }
        }

        return null;
    }

    isVisible (object) {

        if (object.y - object.hitbox.height < 0) {
            return false;
        }

        if (object.y + object.hitbox.height > this.window.height) {
            return false
        }

        if (object.x + object.hitbox.width > this.window.width) {
            return false;
        }

        if (object.x - object.hitbox.width < 0) {
            return false;
        }

        return true;
    }
}
