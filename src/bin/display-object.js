'use strict';

import * as PIXI from 'pixi.js';

export const DIRECTION_UP = 'up';
export const DIRECTION_RIGHT = 'right';
export const DIRECTION_LEFT = 'left';
export const DIRECTION_DOWN = 'down';

export class DisplayObject extends PIXI.Container {

    constructor (x, y, hitboxWidth = 0, hitboxHeight = 0) {
        super();

        this.x = x;
        this.y = y;
        this.life = 100;
        this.strength = 5;
        this.velocity = 2;
        this.direction = null;
        this.hitbox = {
            width: hitboxWidth,
            height: hitboxHeight
        };

        this.movable = true;
        this.unblockable = false;
    }

    move () {
        if (this.movable) {
            switch (this.direction) {
                case DIRECTION_UP:
                    this.x += Math.cos(this.rotation) * this.velocity;
                    this.y += Math.sin(this.rotation) * this.velocity;
                    break;
                case DIRECTION_RIGHT:
                    this.x += Math.cos(this.rotation + (Math.PI / 2)) * this.velocity;
                    this.y += Math.sin(this.rotation + (Math.PI / 2)) * this.velocity;
                    break;
                case DIRECTION_LEFT:
                    this.x += Math.cos(this.rotation - (Math.PI / 2)) * this.velocity;
                    this.y += Math.sin(this.rotation - (Math.PI / 2)) * this.velocity;
                    break;
                case DIRECTION_DOWN:
                    this.x += Math.cos(this.rotation + Math.PI) * this.velocity;
                    this.y += Math.sin(this.rotation + Math.PI) * this.velocity;
                    break;
            }
        }
    }

    follow (point) {
        this.rotation = Math.atan2(point.y - this.y, point.x - this.x);
    }

    initPivot () {
        this.pivot = new PIXI.Point(this.hitbox.width / 2, this.hitbox.height / 2);
    }

    checkCollisions (objects) {

        let directions = {};

        if (this.unblockable) {
            return;
        }

        if (!Array.isArray(objects)) {
            objects = [objects];
        }

        for (let object of objects) {

            directions = {
                up: false,
                down: false,
                left: false,
                right: false
            };

            if (this.x <= object.x) {
                directions.left = true;
            }

            if (this.x > object.x) {
                directions.right;
            }

            if (this.y < object.y) {
                directions.top = true;
            }

            if (this.y > object.y) {
                directions.down = true;
            }

            // LEFT
            if ((this.x + this.hitbox.width - this.pivot.x) > (object.x - object.pivot.x) &&
                this.x < (object.x + object.hitbox.width) &&
                this.y >= object.y &&
                this.y <= (object.y + object.hitbox.height) &&
                directions.left
            ) {
                this.x = object.x - object.pivot.x - this.hitbox.width + this.pivot.x;
                return;
            }

            // RIGHT
            if ((this.x - this.pivot.x) < (object.x + object.hitbox.width - object.pivot.x) &&
                this.x > object.x &&
                this.y >= object.y &&
                this.y <= (object.y + object.hitbox.height) &&
                directions.right
            ) {
                this.x = object.x - object.pivot.x + object.hitbox.width + this.pivot.x;
                return;
            }

            // TOP
            if ((this.y + this.hitbox.height - this.pivot.y) > (object.y - object.pivot.y) &&
                this.y < (object.y + object.hitbox.height) &&
                this.x >= object.x &&
                this.x <= (object.x + object.hitbox.width) &&
                directions.top
            ) {
                this.y = object.y - object.pivot.y - this.hitbox.height + this.pivot.y;
                return;
            }

            // DOWN
            if ((this.y - this.pivot.y) < (object.y + object.hitbox.height - object.pivot.y) &&
                this.y > object.y &&
                this.x >= object.x &&
                this.x <= (object.x + object.hitbox.width) &&
                directions.down
            ) {
                this.y = object.y - object.pivot.y + object.hitbox.height + this.pivot.y;
                return;
            }
        }
    }
}
