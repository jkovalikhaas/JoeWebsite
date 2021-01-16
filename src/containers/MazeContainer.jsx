/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSwipeable } from "react-swipeable";
import { isMobile } from 'react-device-detect';
import colors from '../globals/colors.js';
import { R, randInt } from '../globals/variables.jsx';
import FinishedModal from '../components/FinishedModal.jsx';
import generateGrid, { setValue, isOpen, getNeighbor } from '../maze/js/generateGrid.js';
import backtracker from '../maze/js/recursiveBacktracker.js';
import longestPath from '../maze/js/longestPath.js';
import solutionPath from '../maze/js/solutionPath.js';
import Button from '../components/Button.jsx';
import SizeSlider from '../components/SizeSlider.jsx';
import MazeGrid from '../maze/components/MazeGrid.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: isMobile ? '80vh' : '90vh',
        overflow: 'hidden',
    },
    nav: {
        height: '6vh',
        margin: '2vh 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: colors.joeDarkGrayBlue
    },
});

// movement controller
const move = (key, maze, current, setCurrent) => {
    const updateCurrent = (dir) => {
        setCurrent(maze[getNeighbor(current, dir).index]);
    }

    // up
    if(key.toLowerCase() == 'w' || key == 'ArrowUp') {
        if(isOpen(current, 'north')) {
            updateCurrent('north');
        }
    }
    // down
    if(key.toLowerCase() == 's' || key == 'ArrowDown') {
        if(isOpen(current, 'south')) {
           updateCurrent('south');
        }
    }
    // left
    if(key.toLowerCase() == 'a' || key == 'ArrowLeft') {
        if(isOpen(current, 'west')) {
            updateCurrent('west');
        }
    }
    //right
    if(key.toLowerCase() == 'd' || key == 'ArrowRight') {
        if(isOpen(current, 'east')) {
            updateCurrent('east');
        }
    }
}

const MazeNav = (props) => {
    const styles = useStyles();

    const {
        setSize,
        resetMaze,
        toggleSol,
    } = props;

    return (
        <div id={'maze-nav'} className={styles.nav}>
            <SizeSlider setSize={setSize} sizes={[11, 15, 19, 23, 27]}/>
            <Button title={'Start'} action={() => resetMaze()} />
            <Button title={'Solution'} action={() => toggleSol()} />
        </div>
    )
}

const MazeContainer = () => {
    const styles = useStyles();

    const [state, setState] = useState({
        size: 11,
        maze: [],
        reset: false,
        current: null,
        finished: false,
        showingMini: false
    });

    // create maze
    useEffect(() => {
        var grid = generateGrid(state.size);
        // create/set start tile
        const start = grid[randInt(state.size)];
        grid = setValue(grid, start.index, 'current');
        // generate maze
        grid = backtracker(grid, state.size, start);
        // create/set last(finish) tile
        const last = longestPath(grid, state.size, start);
        grid = setValue(grid, last, 'last');
        // initial state values
        setState(s => ({
            ...s,
            maze: grid,
            current: grid[start.index],
            finished: false
        }));
    }, [state.reset]);

    // add key effects
    useEffect(() => {
        document.onkeydown = function (e) {
            if(state.current && !state.finished)
                move(e.key.toString(), state.maze, state.current, setCurrent);
        };
    }, [state.maze, state.finished]);

    // const set solution path
    const setSolution = () => {
        var grid = state.maze;
        const hasSolution = state.maze.filter(x => x.value == 'solution').length > 0;
        if(hasSolution) {
            // remove solution path 
            grid = state.maze.map(tile => {
                if(tile.value == 'solution') 
                    return R.assoc('value', 'default', tile);
                return tile;
            })
        } else {
            // add solution path
            const solution = solutionPath(state.maze);
            grid = state.maze.map(tile => {
                if(solution.includes(tile.index) && tile.value != 'current' && tile.value != 'last') {
                    return R.assoc('value', 'solution', tile);
                }
                return tile;
            })
        }
        // update grid
        setState((s) => ({
            ...s,
            maze: grid,
        }));
    };

    // set current tile
    const setCurrent = (tile) => {
        // update current tile
        const temp = state.maze.map(x => {
            if(x.index == tile.index) return R.assoc('value', 'current', x);
            else if(x.value == 'current') return R.assoc('value', 'default', x);
            else return x;
        });
        setState(s => ({
            ...s,
            maze: temp,
            current: temp[tile.index]
        }));
        if(tile.value == 'last') {
            setState(s => ({ ...s, finished: true }));
            return;
        }
    };

    // add swipe movement for mobile
    const swipeHandlers = useSwipeable({
        onSwiping: (e) => {
            const dir = e.dir;
            const dirs = {'Up': 'ArrowUp', 'Down': 'ArrowDown', 'Left': 'ArrowLeft', 'Right': 'ArrowRight'};
            // set timeout between moves
            setTimeout(() => {
                move(R.path([dir], dirs), state.maze, state.current, setCurrent);
            }, 100);
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className={styles.contentArea} {...swipeHandlers}>
            <MazeNav
                setSize={(size) => setState((s) => 
                    ({...s, size: size, reset: !s.reset})
                )}
                resetMaze={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} 
                toggleSol={() => setSolution()} />
            {state.maze && 
            <MazeGrid 
                size={state.size} 
                grid={state.maze} />}
            <FinishedModal 
                isOpen={state.finished}
                completeAction={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} />
        </div>
    );
};

export default MazeContainer;