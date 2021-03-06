import { R, counting } from '../../globals/variables';

// sets grid value based on an index
export const setValue = (grid, index, value) => {
    return R.assocPath([index, 'value'], value, grid);
}

// checks if certain path is open
export const isOpen = (tile, dir) => {
    return tile.neighbors && R.path(['neighbors', dir, 'open'], tile);
}

// returns neighbor of tile in givien direction
export const getNeighbor = (tile, dir) => {
    return tile.neighbors && R.path(['neighbors', dir, 'tile'], tile);
}

// object to hold neighbor value and if has open 'path'
const neighbor = (value) => {
    return {tile: value, open: false}
}

// conects each tile to its neighbors in the grid
const addNeighbors = (grid, size) => {
    return grid.map(tile => {
        const {x, y, index } = tile;
        var neighbors = {
            north: null, south: null, east: null, west: null
        };
        // set north
        if(y !== 0) neighbors.north = neighbor(grid[index - size]);
        // set south
        if(y !== size - 1) neighbors.south = neighbor(grid[index + size]);
        // set east
        if(x !== size - 1) neighbors.east = neighbor(grid[index + 1]);
        // set west
        if(x !== 0) neighbors.west = neighbor(grid[index - 1]);

        return R.assoc('neighbors', neighbors, tile);
    })
}

const Tile = (x, y, index, value = 0) => {
    return {x, y, index, value}
}

// creates 'backend' grid of tiles to hold full information of grid (not fully visible to user)
const Grid = (size = 11) => {
    var grid = counting(size * size).map(index => {
        return (
            Tile(index % size, Math.floor(index / size), index)
        )
    });
    grid = addNeighbors(grid, size);

    return grid;
}

export default Grid;