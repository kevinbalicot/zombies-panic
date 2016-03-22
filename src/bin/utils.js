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

    /**
    * Shuffles array in place.
    * @param {Array} a items The array containing the items.
    */
    static shuffle (a) {
        let j, x, i;
        for (i = a.length; i; i -= 1) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }
}
