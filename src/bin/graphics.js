'use strict';

import * as PIXI from 'pixi.js';

export class Graphics {

    static drawRect (fill, stroke, x, y ,width, height) {
        let rect = new PIXI.Graphics();
        rect.beginFill(fill);
        rect.drawRect(x, y, width, height);
        rect.endFill();

        return rect;
    }
}
