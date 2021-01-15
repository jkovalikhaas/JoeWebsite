/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { useSwipeable } from "react-swipeable";
import { isMobile } from 'react-device-detect';
import colors from '../globals/colors.js';
import { R, randInt, tileSize, makeOdd } from '../globals/variables.jsx';
import FinishedModal from '../components/FinishedModal.jsx';
import generateGrid, { setValue, isOpen, getNeighbor } from '../maze/js/generateGrid.js';
import backtracker from '../maze/js/recursiveBacktracker.js';
import longestPath from '../maze/js/longestPath.js';
import solutionPath from '../maze/js/solutionPath.js';
import Button from '../components/Button.jsx';
import SizeSlider from '../maze/components/SizeSlider.jsx';
import MazeGrid from '../maze/components/MazeGrid.jsx';
import MiniMap from '../maze/components/MiniMap.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: isMobile ? '80vh' : '90vh',
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
});

// calculates grid dimensions in tiles
const gridDimensions = (contentRef, mazeHeight, mazeWidth) => {
    // make sure contentRef is valid
    if(!contentRef.current) return { tileWidth: 11, tileHeight: 11 }

    const navHeight = R.path(['current', 'firstChild'], contentRef).getBoundingClientRect().height;
    const areaWidth = contentRef.current.getBoundingClientRect().width;
    const areaHeight = contentRef.current.getBoundingClientRect().height - navHeight * 2;

    const convert = (n) => makeOdd(Math.floor((n - tileSize * 2) / tileSize));
    const tileWidth = convert(areaWidth)
    const tileHeight = convert(areaHeight);

    return { tileWidth: Math.min(mazeWidth, tileWidth), tileHeight: Math.min(mazeHeight, tileHeight) }
}

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
const visibleMaze = (maze, current, width, height) => {
    const maxX = R.last(maze).x;
    const maxY = R.last(maze).y;
    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);
    var startX = 0; var startY = 0;

    if(current.x <= centerX) startX = 0;
    else if(current.x >= maxX - centerX) startX = maxX - width + 1;
    else startX = current.x - centerX;

    if(current.y <= centerY) startY = 0;
    else if(current.y >= maxY - centerY) startY = maxY - height + 1;
    else startY = current.y - centerY;

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
        resetMaze,
        toggleMini,
        toggleSol,
    } = props;

    return (
        <div id={'maze-nav'} className={styles.nav}>
            <SizeSlider setSize={setSize} />
            <Button title={'Start'} action={() => resetMaze()} />
            <Button title={'MiniMap'} action={() => toggleMini()} />
            <Button title={'Solution'} action={() => toggleSol()} />
        </div>
    )
}

const MazeContainer = () => {
    const styles = useStyles();

    const [state, setState] = useState({
        width: 11,
        height: 11,
        tileWidth: 11,
        tileHeight: 11,
        maze: [],
        reset: false,
        current: null,
        finished: false,
        showingMini: false
    });

    // holds area around/containing maze
    const contentRef = useRef(null);

    // removes scroll durring touch move
    if(contentRef.current) contentRef.current.addEventListener('touchmove', e => e.preventDefault(), {passive: false})

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
        // get dimensions of visible grid
        const { tileWidth, tileHeight } = gridDimensions(contentRef, state.width, state.height);
        // initial state values
        setState(s => ({
            ...s,
            maze: grid,
            current: grid[start.index],
            tileWidth: tileWidth,
            tileHeight: tileHeight,
            visible: state.current && visibleMaze(state.maze, state.current, tileWidth, tileHeight),
            finished: false
        }));
    }, [state.reset]);

    // update visible maze
    useEffect(() => {
        if(state.current)
            setState(s => ({...s, visible: visibleMaze(s.maze, s.current, s.tileWidth, s.tileHeight)}));
    }, [state.current]);

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
        // update grid/visible grid
        setState((s) => ({
            ...s,
            maze: grid,
            visible: state.current && visibleMaze(grid, state.current, state.tileWidth, state.tileHeight),
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
        <div className={styles.contentArea} ref={contentRef}>
            <MazeNav
                setSize={(w, h) => setState((s) => 
                    ({...s, width: w, height: h, reset: !s.reset})
                )}
                resetMaze={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} 
                toggleMini={() => setState((s) => 
                    ({...s, showingMini: !s.showingMini})
                )}
                toggleSol={() => setSolution()} />
            {state.visible && 
            <MazeGrid 
                width={state.tileWidth} 
                height={state.tileHeight} 
                grid={state.visible}
                swipeHandlers={swipeHandlers} />}
            {state.current && state.showingMini &&
            <MiniMap
                width={state.width}
                height={state.height}
                maze={state.maze} />}
            <FinishedModal 
                isOpen={state.finished}
                completeAction={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} />
        </div>
    );
};

export default MazeContainer;