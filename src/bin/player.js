'use strict';

import {DisplayObject, DIRECTION_UP} from './display-object';
import {Bullet} from './bullet';

export class Player extends DisplayObject {

    constructor (x, y, hitboxWidth, hitboxHeight) {
        super(x, y, hitboxWidth, hitboxHeight);

        this.shooting = false;
    }

    pushBy (object, power = 4) {
        this.x += Math.cos(object.rotation) * (object.velocity * power);
        this.y += Math.sin(object.rotation) * (object.velocity * power);
    }

    hite (object, power = 10) {
        this.pushBy(object, power);
        this.life -= object.strength;
    }

    shoot () {
        if (!this.shooting) {
            let bullet = new Bullet(this.x, this.y, 2, 2);
            bullet.strength = 20;
            bullet.rotation = this.rotation;
            bullet.direction = DIRECTION_UP;
            bullet.initPivot();
            this.shooting = true;

            setTimeout(() => this.shooting = false, 100);

            return bullet;
        }

        return null;
    }
}
