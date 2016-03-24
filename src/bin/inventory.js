'use strict';

export class Inventory {

    constructor () {
        this.items = [];
        this.currentIndex = null;
    }

    add (item) {
        if (this.has(item.name)) {
            this.update(item);
        } else {
            this.items.push(item);
        }

        if (this.currentIndex === null) {
            this.currentIndex = 0;
        }

        return this;
    }

    has (itemName) {
        return this.items.some(item => item.name === itemName);
    }

    get (itemName) {
        for (let item of this.items) {
            if (item.name == itemName) {
                return item;
            }
        }

        return null;
    }

    getCurrent () {
        if (this.currentIndex !== null) {
            return this.items[this.currentIndex];
        }

        return null;
    }

    remove (itemName, quantity) {
        let mapItem = this.items.get(itemName);

        if (mapItem && (mapItem.quantity - quantity) <= 0) {
            this.items.delete(itemName);
        }

        mapItem.quantity -= quantity;
        this.items.set(itemName, mapItem);

        return this;
    }

    delete (item) {
        return this.items.delete(item.name);
    }

    update (item) {
        let itemToUpdate = this.get(item.name);
        itemToUpdate.quantity += item.quantity;

        return this;
    }

    getNext () {
        if (this.currentIndex + 1 >= this.items.length) {
            this.currentIndex = 0;
            return this.items[0];
        }

        this.currentIndex = this.currentIndex + 1;
        return this.items[this.currentIndex];
    }

    getPreviouse () {
        if (this.currentIndex - 1 < 0) {
            this.currentIndex = this.items.length - 1;
            return this.items[this.items.length - 1];
        }

        this.currentIndex = this.currentIndex - 1;
        return this.items[this.currentIndex];
    }
}
