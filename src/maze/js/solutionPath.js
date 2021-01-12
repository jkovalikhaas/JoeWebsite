/* eslint-disable no-loop-func */
/* eslint-disable eqeqeq */
import { R, falses } from '../../globals/variables';

// uses astar to find best path between start and last tile

const Node = (tile, cost, level, parent) => {
    return { tile, cost, level, parent };
}

// finds manhattan distance between curent and last tile
const manhattan = (current, last) => {
    return Math.abs(current.x - last.x) + Math.abs(current.y - last.y);
}

// finds solution path from child node
const path = (child) => {
    var path = [];
    var current = child;
    while(current != null) {
        path = R.append(current.tile.index, path);
        current = current.parent;
    }
    return path;
}

const solutionPath = (maze) => {
    const start = maze.filter(x => x.value == 'current')[0];
    const last = maze.filter(x => x.value == 'last')[0];
    var seen = falses(maze.length);
    var queue = [Node(start, -1, 0, null)];

    while(!R.isEmpty(queue)) {
        const current = queue.pop();
        seen[current.tile.index] = true;
        // check if solution found
        if(current.tile.index == last.index) {
            return path(current);
        }
        // look at current neighbors for possible moves
        Object.entries(current.tile.neighbors).forEach(([key, value]) => {
            if(value == null || !value.open) return;
            const temp = maze[value.tile.index];
            if(seen[temp.index]) return;
            const cost = manhattan(current.tile, last);
            // add to then sort queue
            queue = R.append(Node(temp, cost, current.level + 1, current), queue);
            queue = R.sortBy(R.prop('cost'))(queue);
        });
    }

    return [];
}

export default solutionPath;