'use strict';

export class Item {

    constructor (object, name, quantity = 1, rang = 0) {
        this.object = object;
        this.name = name;
        this.quantity = quantity;
        this.rang = rang;
    }
}
