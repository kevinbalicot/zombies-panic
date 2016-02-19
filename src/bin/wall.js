'use strict';

import {DisplayObject} from './display-object';

export class Wall extends DisplayObject {

    constructor (x, y, hitboxWidth = 10, hitboxHeight = 10) {
        super(x, y, hitboxWidth, hitboxHeight);
        this.movable = false;
    }
}
