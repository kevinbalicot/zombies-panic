'use strict';

export class Utils {

    static random (min, max, negatif = false, floor = true) {
        let rand = (Math.random() * max) + min;

        if (negatif) {
            rand *= this.random(0, 1) == 1 ? 1 : -1;
        }

        if (floor) {
            return Math.floor(rand);
        }

        return rand;
    }

    static degToRad (deg) {
        return deg * Math.PI / 180;
    }

    static radToDeg (rad) {
        return rad * 180 / Math.PI;
    }
}
