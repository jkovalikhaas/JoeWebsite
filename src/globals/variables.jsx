
export const R = require('ramda');

export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

export const isVertical = screenHeight > screenWidth;
export const tileSize = isVertical ? screenHeight / 25 : screenHeight / 18;

export const zeros = (n) => Array(n).fill(0);
export const counting = (n) => Array.from(Array(n).keys());
export const falses = (n) => Array(n).fill(false);

export const randInt = (n) => Math.floor(Math.random() * n);
export const makeOdd = (n) => n % 2 == 0 ? n - 1 : n;

// makes a color transulcent
export const translucify = (color) => {
    return color + '80';
}

// gets opposite direction
export const oppositeDir = (dir) => {
    if(dir === 'north') return 'south';
    else if (dir === 'south') return 'north';
    else if (dir === 'east') return 'west';
    else if (dir === 'west') return 'east';
    else return null;   // should never occur
}