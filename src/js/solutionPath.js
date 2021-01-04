/* eslint-disable eqeqeq */
import { R, randInt, zeros, oppositeDir } from '../globals/variables';

// uses astar to find best path between start and last tile

const solutionPath = (maze) => {
    const current = maze.filter(x => x.value == 'current')[0];
    const finish = maze.filter(x => x.value == 'last')[0];
    const seen = zeros(maze.length);
    console.log(seen)
    return {current, finish}
}

export default solutionPath;