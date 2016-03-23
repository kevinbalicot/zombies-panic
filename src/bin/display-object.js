'use strict';

import * as PIXI from 'pixi.js';

export const DIRECTION_UP = 'up';
export const DIRECTION_RIGHT = 'right';
export const DIRECTION_LEFT = 'left';
export const DIRECTION_DOWN = 'down';

export class DisplayObject extends PIXI.Container {

    constructor (x, y, hitboxWidth = 0, hitboxHeight = 0, velocity = 2) {
        super();

        this.x = x;
        this.y = y;
        this.velocity = velocity;
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

    getHitbox () {
        return new PIXI.Rectangle(
            this.x - this.pivot.x,
            this.y - this.pivot.y,
            this.hitbox.width,
            this.hitbox.height
        );
    }

    follow (point) {
        this.rotation = Math.atan2(point.y - this.y, point.x - this.x);
    }

    initPivot () {
        this.pivot = new PIXI.Point(this.hitbox.width / 2, this.hitbox.height / 2);
    }

    checkCollisions (objects) {

        let directions = {};
        let hitbox = this.getHitbox();
        let objectHitbox = null;

        if (this.unblockable) {
            return;
        }

        if (!Array.isArray(objects)) {
            objects = [objects];
        }

        for (let object of objects) {

            objectHitbox = object.getHitbox();

            directions = {
                up: false,
                down: false,
                left: false,
                right: false
            };

            if (this.x <= object.x) {
                directions.left = true;
            }

            if (this.x > object.x + objectHitbox.width) {
                directions.right = true;
            }

            if (this.y < object.y) {
                directions.top = true;
            }

            if (this.y > object.y + objectHitbox.height) {
                directions.down = true;
            }

            // LEFT
            if ((hitbox.x + hitbox.width) > objectHitbox.x &&
                hitbox.x < (objectHitbox.x + objectHitbox.width) &&
                hitbox.y >= objectHitbox.y &&
                hitbox.y <= (objectHitbox.y + objectHitbox.height) &&
                directions.left
            ) {
                this.x = objectHitbox.x - hitbox.width + this.pivot.x;
                return;
            }

            // RIGHT
            if (hitbox.x < (objectHitbox.x + objectHitbox.width) &&
                hitbox.x > objectHitbox.x &&
                hitbox.y >= objectHitbox.y &&
                hitbox.y <= (objectHitbox.y + objectHitbox.height) &&
                directions.right
            ) {
                this.x = objectHitbox.x + objectHitbox.width + this.pivot.x;
                return;
            }

            // TOP
            if ((hitbox.y + hitbox.height) > objectHitbox.y &&
                hitbox.y < (objectHitbox.y + objectHitbox.height) &&
                hitbox.x >= objectHitbox.x &&
                hitbox.x <= (objectHitbox.x + objectHitbox.width) &&
                directions.top
            ) {
                this.y = objectHitbox.y - hitbox.height + this.pivot.y;
                return;
            }

            // DOWN
            if (hitbox.y < (objectHitbox.y + objectHitbox.height) &&
                hitbox.y > objectHitbox.y &&
                hitbox.x >= objectHitbox.x &&
                hitbox.x <= (objectHitbox.x + objectHitbox.width) &&
                directions.down
            ) {
                this.y = objectHitbox.y + objectHitbox.height + this.pivot.y;
                return;
            }
        }
    }
}
