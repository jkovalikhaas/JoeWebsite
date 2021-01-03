/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { isMobile } from "react-device-detect";
import colors from '../globals/colors.js';
import { R, randInt, divCenter } from '../globals/variables.jsx';
import generateGrid, { setValue, isOpen, getNeighbor } from '../js/generateGrid.js';
import backtracker from '../js/recursiveBacktracker.js';
import longestPath from '../js/longestPath.js';
import touchLocation from '../js/touchLocation.js';
import Button from '../components/Button.jsx';
import MazeGrid from '../components/MazeGrid.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '92vh',
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
        resetMaze
    } = props;

    return (
        <div className={styles.nav}>
            <Button title={'Size'} action={() => console.log('size')}/>
            <Button title={'Start'} action={() => resetMaze()} />
        </div>
    )
}

const MazeContainer = () => {
    const styles = useStyles();

    const [state, setState] = useState({
        width: 10,
        height: 10,
        maze: [],
        reset: false,
        current: null,
        finished: false
    });

    const mazeRef = useRef(null);   // holds base for maze

    // create maze
    useEffect(() => {
        var grid = generateGrid();
        // create/set start tile
        const start = grid[randInt(state.width * state.height)];
        grid = setValue(grid, start.index, 'start');
        // generate maze
        grid = backtracker(grid, state.width, state.height, start);
        // create/set last(finish) tile
        const last = longestPath(grid, state.width, state.height, start);
        grid = setValue(grid, last, 'last');
        // initial state values
        setState({ 
            width: 10, height: 10,
            maze: grid,
            current: grid[start.index],
            finished: false
        });
    }, [state.reset]);

    // add key effects
    useEffect(() => {
        document.onkeydown = function (e) {
            if(state.current && !state.finished)
                move(e.key.toString(), state.maze, state.current, setCurrent);
        };
        if(isMobile && mazeRef.current) {
            document.ontouchstart = function (e) {
                const { clientX, clientY } = R.path(['targetTouches', 0], e);
                console.log(touchLocation(mazeRef.current, clientX, clientY));
            }
        }
    }, [state.current, state.finished]);

    // set current tile
    const setCurrent = (tile) => {
        if(tile.value == 'start') return;
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
            console.log("Yayyyyy");
            setState(s => ({ ...s, finished: true }));
            return;
        }
    };

    return (
        <div className={styles.contentArea}>
            <MazeNav
                resetMaze={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} />
            <MazeGrid 
                width={state.width} 
                height={state.height} 
                grid={state.maze} 
                mazeRef={mazeRef} />
        </div>
    );
};

export default MazeContainer;