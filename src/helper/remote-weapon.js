'use strict';

export class RemoteWeapon {

    constructor (
        name,
        damage,
        effective,
        perforate = 0,
        back = 0,
        loader = 0,
        ammo = 0,
        speed = 500,
        reloadingTime = 1000
    ) {
        this.name = name;

        this.damage = damage;
        this.effective = effective;
        this.perforate = perforate;
        this.back = back;

        this.loader = loader;
        this.ammo = ammo;
        this.speed = speed;
        this.reloadingTime = reloadingTime;

        this.currentLoaderState = 0;
        this.readyToShoot = true;
        this.icon = null;
    }

    shoot () {
        if (this.currentLoaderState >= this.loader && this.readyToShoot) {
            this.reloading();
        }
    }

    reloading () {
        this.readyToShoot = false;
        setTimeout(() => {
            if (this.ammo > 0) {
                this.currentLoaderState = 0;
                this.readyToShoot = true;
            }
        }, this.reloadingTime);
    }

    state () {
        return {
            loaderState: this.loader - this.currentLoaderState,
            loader: this.loader,
            ammo: this.ammo,
            icon: this.icon
        };
    }
}
