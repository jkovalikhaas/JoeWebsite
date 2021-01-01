
export const R = require('ramda');

export const width = window.innerWidth;
export const height = window.innerHeight;

export const isVertical = height > width;

export const zeros = (n) => Array(n).fill(0);
export const counting = (n) => Array.from(Array(n).keys());

export const randInt = (n) => Math.floor(Math.random() * n);

// gets opposite direction
export const oppositeDir = (dir) => {
    if(dir === 'north') return 'south';
    else if (dir === 'south') return 'north';
    else if (dir === 'east') return 'west';
    else if (dir === 'west') return 'east';
    else return null;   // should never occur
}