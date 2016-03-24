'use strict';

import {DisplayObject} from './../../bin/display-object';
import {Utils} from './../../bin/utils';
import {Item} from './../../bin/item';
import {MachineGun} from './../weapons/machine-gun';
import {Shotgun} from './../weapons/shotgun';
import {SubmachineGun} from './../weapons/submachine-gun';

export class WeaponPack extends DisplayObject {

    constructor (x, y, width, height, texture) {
        super(x, y, width, height, 0);
        let body = new PIXI.Sprite(texture);

        this.addChild(body);
    }

    take (player) {
        let percent = Utils.random(0, 100);

        if (percent <= 50) {
            let gun = new SubmachineGun();
            player.inventory.add(new Item(gun, gun.name));
        } else if (percent > 50 && percent <= 80) {
            let gun = new Shotgun();
            player.inventory.add(new Item(gun, gun.name));
        } else {
            let gun = new MachineGun();
            player.inventory.add(new Item(gun, gun.name));
        }
    }
}
