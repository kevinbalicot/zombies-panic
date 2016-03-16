'use strict';

import {DisplayObject, DIRECTION_UP} from './../bin/display-object';
import * as PIXI from 'pixi.js';

export class Player extends DisplayObject {

    constructor (x, y, hitboxWidth, hitboxHeight) {
        super(x, y, hitboxWidth, hitboxHeight);
    }

    pushBy (object, power = 4) {
        this.x += Math.cos(object.rotation) * (object.velocity * power);
        this.y += Math.sin(object.rotation) * (object.velocity * power);
    }

    hite (object, damage, power = 10) {
        this.pushBy(object, power);
        this.life -= damage;
    }

    shoot () {
        return this.weapon.shoot(new PIXI.Point(this.x, this.y), this.rotation, DIRECTION_UP);
    }
}
