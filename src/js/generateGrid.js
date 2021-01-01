import { R, counting, randInt } from '../globals/variables';
import backtracker from './recursiveBacktracker.js';

// object to hold neighbor value and if has open 'path'
const neighbor = (value) => {
    return {tile: value, open: false}
}

// conects each tile to its neighbors in the grid
const addNeighbors = (grid, width, height) => {
    return grid.map(tile => {
        const {x, y, index } = tile;
        var neighbors = {
            north: null, south: null, east: null, west: null
        };
        // set north
        if(y !== 0) neighbors.north = neighbor(grid[index - width]);
        // set south
        if(y !== height - 1) neighbors.south = neighbor(grid[index + width]);
        // set east
        if(x !== width - 1) neighbors.east = neighbor(grid[index + 1]);
        // set west
        if(x !== 0) neighbors.west = neighbor(grid[index - 1]);

        return R.assoc('neighbors', neighbors, tile);
    })
}

const Tile = (x, y, index, value = 0) => {
    return {x, y, index, value}
}

// creates 'backend' grid of tiles to hold full information of grid (not fully visible to user)
const Grid = (width = 10, height = 10) => {
    const size = width * height;

    var grid = counting(size).map(index => {
        return (
            Tile(index % width, Math.floor(index / height), index)
        )
    });

    grid = addNeighbors(grid, width, height);
    
    // random start to maze
    const start = grid[randInt(width * height)];
    // set maze path
    grid = backtracker(grid, width, height, start);

    return grid;
}

export default Grid;