import { R, randInt, zeros, oppositeDir } from '../globals/variables';

// 'opens' path between neighbors 
const openPath = (grid, index, dir) => {
    return R.assocPath([index, 'neighbors', dir, 'open'], true, grid);
}

// returns current tiles valid neighbors (not null or seen)
const getNeighbors = (tile, seen) => {
    const neighbors = [];
    Object.entries(tile.neighbors).forEach(([key, value]) => {
        if(value == null) return;
        const neighbor = value.tile;
        if(!seen[neighbor.index]) 
            neighbors.push({key, value});
    });
    return neighbors;
}

const generateMaze = (grid, start, seen) => {
    var stack = []; // holds 'list' of maze path
    stack = R.append(start, stack);
    seen = R.assoc(start.index, 1, seen);

    while(!R.isEmpty(stack)) {
        const current = R.last(stack);
        const neighbors = getNeighbors(current, seen);

        if(R.isEmpty(neighbors)) stack.pop();   // if no valid neighbors, remove from stack
        else {
            const randNeighbor = neighbors[randInt(neighbors.length)]; // picks random neighbor
            const { key, value } = randNeighbor;
            const { tile } = value;
            const nextTile = grid[tile.index];
            // update stack/visited array
            stack = R.append(nextTile, stack);
            seen = R.assoc(nextTile.index, 1, seen);
            // 'open' paths for current and next tiles
            grid = openPath(grid, current.index, key);
            grid = openPath(grid, nextTile.index, oppositeDir(key));
        }
    }
    return grid;
}

const backtracker = (grid, width, height, start) => {
    var seen = zeros(width * height);   // visited array
    grid = generateMaze(grid, start, seen);
    return grid;
}

export default backtracker;