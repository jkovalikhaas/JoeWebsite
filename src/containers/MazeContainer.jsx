/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { Joystick } from 'react-joystick-component';
import { isMobile } from "react-device-detect";
import colors from '../globals/colors.js';
import { R, randInt, translucify } from '../globals/variables.jsx';
import generateGrid, { setValue, isOpen, getNeighbor } from '../js/generateGrid.js';
import backtracker from '../js/recursiveBacktracker.js';
import longestPath from '../js/longestPath.js';
import Button from '../components/Button.jsx';
import SizeSlider from '../components/SizeSlider.jsx';
import MazeGrid from '../components/MazeGrid.jsx';
import FinishedModal from '../components/FinishedModal.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '90vh',
        overflow: 'hidden',
        touchAction: 'none'
    },
    nav: {
        height: '6vh',
        margin: '2vh 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: colors.joeDarkGrayBlue
    },
    joystick: {
        position: 'absolute',
        left: 'calc(50% - 50px)',
        bottom: '10vh',
    }
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

// returns part of maze that is being shown
const visibleMaze = (maze, current, width = 11, height = 11) => {
    const maxX = R.last(maze).x;
    const maxY = R.last(maze).y;
    const center = Math.floor(width / 2);

    var startX = 0; var startY = 0;

    if(current.x <= center) startX = 0;
    else if(current.x >= maxX - center) startX = maxX - width + 1;
    else startX = current.x - center;

    if(current.y <= center) startY = 0;
    else if(current.y >= maxY - center) startY = maxY - height + 1;
    else startY = current.y - center;

    const array = [];
    // add all tiles to array that are in visible block
    maze.forEach(tile => {
        if(tile.x >= startX && tile.x < startX + width &&
           tile.y >= startY && tile.y < startY + height)
            array.push(tile);
    })

    return array;
}

const MazeNav = (props) => {
    const styles = useStyles();

    const {
        setSize,
        resetMaze
    } = props;

    return (
        <div className={styles.nav}>
            <SizeSlider setSize={setSize} />
            <Button title={'Start'} action={() => resetMaze()} />
        </div>
    )
}

const MazeContainer = () => {
    const styles = useStyles();

    const [state, setState] = useState({
        width: 11,
        height: 11,
        maze: [],
        reset: false,
        current: null,
        finished: false
    });

    // create maze
    useEffect(() => {
        var grid = generateGrid(state.width, state.height);
        // create/set start tile
        const start = grid[randInt(state.width * state.height)];
        grid = setValue(grid, start.index, 'current');
        // generate maze
        grid = backtracker(grid, state.width, state.height, start);
        // create/set last(finish) tile
        const last = longestPath(grid, state.width, state.height, start);
        grid = setValue(grid, last, 'last');
        // initial state values
        setState(s => ({
            ...s,
            maze: grid,
            current: grid[start.index],
            visible: state.current && visibleMaze(state.maze, state.current),
            finished: false
        }));
    }, [state.reset]);

    // update visible maze
    useEffect(() => {
        if(state.current)
            setState(s => ({...s, visible: visibleMaze(state.maze, state.current)}));
    }, [state.current])

    // add key effects
    useEffect(() => {
        document.onkeydown = function (e) {
            if(state.current && !state.finished)
                move(e.key.toString(), state.maze, state.current, setCurrent);
        };
    }, [state.current, state.finished]);

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

    return (
        <div className={styles.contentArea}>
            <MazeNav
                setSize={(w, h) => setState((s) => 
                    ({...s, width: w, height: h, reset: !s.reset})
                )}
                resetMaze={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} />
            {state.visible && <MazeGrid 
                // width={state.width} 
                // height={state.height} 
                grid={state.visible} />}
            {isMobile &&
            <div className={styles.joystick}>
                <Joystick 
                    size={100} 
                    baseColor={translucify(colors.joeGrayBlue)} 
                    stickColor={translucify(colors.joeDarkBlue)} 
                    disabled={!state.current || state.finished}
                    throttle={120}
                    move={(e) => {
                        const dirs = {
                            'FORWARD': 'ArrowUp',
                            'BACKWARD': 'ArrowDown', 
                            'LEFT': 'ArrowLeft',
                            'RIGHT': 'ArrowRight'
                        }
                        move(R.path([e.direction], dirs), state.maze, state.current, setCurrent)
                    }} >
                </Joystick>
            </div>}
            <FinishedModal 
                isOpen={state.finished}
                resetMaze={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} />
        </div>
    );
};

export default MazeContainer;