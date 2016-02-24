'use strict';

import * as PIXI from 'pixi.js';
import {DisplayObject} from './../bin/display-object';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from './../config/config';

export class Bullet extends DisplayObject {

    constructor (x, y, strength, effective, perforate, hitboxWidth = 1, hitboxHeight = 1) {
        super(x, y, hitboxWidth, hitboxHeight);
        this.origin = new PIXI.Point(x, y);
        this.velocity = 10;
        this.effective = effective;
        this.strength = strength;
        this.perforate = perforate;

        let bulletBody = new PIXI.Graphics();
        bulletBody.beginFill(0x000000);
        bulletBody.drawCircle(0, 0, 1);
        bulletBody.endFill();

        this.addChild(bulletBody);
    }

    getDamage () {
        let distance = Math.hypot(this.x - this.origin.x, this.y - this.origin.y);
        let ratio = (distance * 100) / this.effective;
        let damage = this.strength - Math.abs((this.strength * (ratio / 100)) - this.perforate);

        return Math.floor(damage) > 0 ? Math.floor(damage) : 1;
    }
}
