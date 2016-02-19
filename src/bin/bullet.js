'use strict';

import * as PIXI from 'pixi.js';
import {DisplayObject} from './display-object';

export class Bullet extends DisplayObject {

    constructor (x, y, hitboxWidth = 1, hitboxHeight = 1) {
        super(x, y, hitboxWidth, hitboxHeight);
        this.velocity = 10;

        let bulletBody = new PIXI.Graphics();
        bulletBody.beginFill(0x000000);
        bulletBody.drawCircle(0, 0, 1);
        bulletBody.endFill();

        this.addChild(bulletBody);
    }
}
