'use strict';

import * as PIXI from 'pixi.js';

class Loader extends PIXI.loaders.Loader {

    constructor () {
        super();
        //this.ressources = [];
        //this.on('complete', (loader, ressources) => this.ressources = ressources);
    }

    addAssets (assets) {
        for (let asset of assets) {
            this.add(asset.key, asset.path);
        }
    }

    loadAssets (assets, callback) {
        this.addAssets(assets);
        this.load();
    }
}

let loader = new Loader();

export default loader;
