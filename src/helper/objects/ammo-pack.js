'use strict';

import {DisplayObject} from './../../bin/display-object';
import {Gun} from './../weapons/gun';

export class AmmoPack extends DisplayObject {

    constructor (x, y, width, height, texture) {
        super(x, y, width, height, 0);
        let body = new PIXI.Sprite(texture);

        this.addChild(body);
    }

    take (player) {
        player.inventory.items.forEach(item => {
            if (item.name !== 'Pistolet') {
                item.object.ammo += item.object.loader;
                item.object.readyToShoot = true;
            }
        });
    }
}
