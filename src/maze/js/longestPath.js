import { R, zeros, oppositeDir } from '../../globals/variables';

// calculates index of tile farthest from start

// checks if all tiles have been visited
const allSeen = (seen, start) => {
    var all = true;
    seen.forEach((x, i) => {
        if(i === start.index) return;
        if(x === 0) all = false;
    });
    return all;
}

// recusivly iterates through maze finding the tile farthest from start
const generateCosts = (grid, seen, start, current) => {
    if(allSeen(seen, start)) return seen;
    else {
        for(const [dir, neighbor] of Object.entries(current.neighbors)) {
            if(neighbor == null) continue;
            const { tile } = neighbor;
            const { index } = tile;
            const temp = grid[index];   // gets neighbor tile directly from grid
            // skips neighbor if path is blocked, is the starting tile or has already been visited
            if(!R.path(['neighbors', oppositeDir(dir), 'open'], temp) || index === start.index || seen[index] > 0) 
                continue;
            seen[index] = seen[current.index] + 1;  // updates seen list
            generateCosts(grid, seen, start, temp);
        }
    }
    return seen;
}

const longestPath = (grid, size, start) => {
    const seen = generateCosts(grid, zeros(size * size), start, start);
    return seen.indexOf(Math.max(...seen));
}

export default longestPath;