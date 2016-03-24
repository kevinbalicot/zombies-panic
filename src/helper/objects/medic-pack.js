'use strict';

import {DisplayObject} from './../../bin/display-object';

export class MedicPack extends DisplayObject {

    constructor (x, y, width, height, texture) {
        super(x, y, width, height, 0);
        let body = new PIXI.Sprite(texture);

        this.addChild(body);
    }

    take (player) {
        player.heal(50);
    }
}
