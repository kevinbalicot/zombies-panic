'use strict';

import {RemoteWeapon} from './../remote-weapon';
import {Bullet} from './../bullet';
import {Utils} from './../../bin/utils';
import {MACHINE_GUN as weapon} from './../../config/config';

export class MachineGun extends RemoteWeapon {

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

        if (this.readyToShoot && this.ammo > 0) {
            let bullet = new Bullet(position.x, position.y, this.damage, this.effective, this.perforate, 2, 2);

            bullet.direction = direction;
            bullet.rotation = rotation + Utils.degToRad(Utils.random(0, this.back, true, false));
            bullet.initPivot();

            this.currentLoaderState += 1;
            this.ammo -= 1;
            this.readyToShoot = false;

            setTimeout(() => this.readyToShoot = true, this.speed);

            return bullet;
        }

        return null;
    }
}
