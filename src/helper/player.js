'use strict';

import {DisplayObject, DIRECTION_UP} from './../bin/display-object';
import * as PIXI from 'pixi.js';

export class Player extends DisplayObject {

    constructor (x, y, hitboxWidth, hitboxHeight, life = 100, strength = 4, velocity = 2) {
        super(x, y, hitboxWidth, hitboxHeight, velocity);
        this.direction = DIRECTION_UP;
        this.life = life;
        this.maxLife = this.life;
        this.strength = strength;
        this.inventory = null;
    }

    get weapon () {
        if (this.inventory !== null) {
            return this.inventory.getCurrent().object;
        }

        return null;
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
        return this.weapon !== null
            ? this.weapon.shoot(new PIXI.Point(this.x, this.y), this.rotation, DIRECTION_UP)
            : null;
    }

    heal (life) {
        if (this.life + life >= this.maxLife) {
            this.life = this.maxLife;
        } else {
            this.life += life;
        }
    }
}
