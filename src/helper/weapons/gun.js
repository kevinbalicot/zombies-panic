'use strict';

import {RemoteWeapon} from './../remote-weapon';
import {Bullet} from './../bullet';
import {GUN as weapon} from './../../config/config';

export class Gun extends RemoteWeapon {

    constructor () {
        super(
            weapon.name,
            weapon.damage,
            weapon.effective,
            weapon.perforate,
            weapon.back,
            weapon.loader,
            weapon.ammo,
            weapon.speed,
            weapon.reloadingTime
        );
        this.icon = weapon.icon;
    }

    shoot (position, rotation, direction) {

        super.shoot();

        if (this.readyToShoot) {
            let bullet = new Bullet(position.x, position.y, this.damage, this.effective, this.perforate, 2, 2);
            bullet.direction = direction;
            bullet.rotation = rotation;
            bullet.initPivot();

            this.currentLoaderState += 1;
            this.readyToShoot = false;

            setTimeout(() => this.readyToShoot = true, this.speed);

            return bullet;
        }

        return null;
    }

    reloading () {
        this.readyToShoot = false;
        setTimeout(() => {
            this.currentLoaderState = 0;
            this.readyToShoot = true;
        }, this.reloadingTime);
    }
}
