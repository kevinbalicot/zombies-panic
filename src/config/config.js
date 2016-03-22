'use strict';

export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 600;

export const GUN = {
    name: 'Pistolet',
    damage: 20,
    effective: 400,
    perforate: 0,
    back: 0,
    loader: 20,
    ammo: 'Inf.',
    speed: 500,
    reloadingTime: 1000,
    icon: '/media/images/icons/pistol-gun.png'
};

export const SUBMACHINE_GUN = {
    name: 'Mitraillette',
    damage: 20,
    effective: 600,
    perforate: 5,
    back: 5,
    loader: 30,
    ammo: 90,
    speed: 300,
    reloadingTime: 1500,
    icon: '/media/images/icons/submachine-gun.png'
};

export const MACHINE_GUN = {
    name: 'Mitraillette lourde',
    damage: 30,
    effective: 700,
    perforate: 10,
    back: 10,
    loader: 50,
    ammo: 100,
    speed: 100,
    reloadingTime: 3000,
    icon: '/media/images/icons/machine-gun.png'
};

export const SHOTGUN = {
    name: 'Fusil à pompe',
    damage: 20,
    effective: 600,
    perforate: 0,
    back: 20,
    loader: 4,
    ammo: 20,
    speed: 1000,
    reloadingTime: 2000,
    icon: '/media/images/icons/shotgun.png'
};

export const ZOMBIE = {
    width: 10,
    height: 10,
    life: 20,
    strength: 5,
    velocity: 0.8,
    color: 0x38c429
}

export const RUNNER = {
    width: 8,
    height: 8,
    life: 40,
    strength: 10,
    velocity: 1.5,
    color: 0x38c999
}

export const TANKER = {
    width: 15,
    height: 15,
    life: 100,
    strength: 5,
    velocity: 0.5,
    color: 0x99d500
}

export const ABOMINATION = {
    width: 20,
    height: 20,
    life: 200,
    strength: 20,
    velocity: 1,
    color: 0x001b00
}

export const WAVE = {
    zombies: 6,
    tankers: 2,
    runners: 2,
    abominations: 1
}
