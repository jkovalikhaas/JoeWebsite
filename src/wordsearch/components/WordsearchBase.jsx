import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { R, isVertical } from '../../globals/variables.jsx';
import colors from '../../globals/colors.js';
import GridList from '@material-ui/core/GridList';
import Grid from "../js/generateGrid.js";
import LetterTile from './LetterTile.jsx';

const useStyles = createUseStyles({
    base: {
        margin: isVertical ? '4vh auto 4vh auto' : '4vh 0 4vh 4vw',
        borderRadius: '5px',
        maxWidth: isVertical ? '80vw' : '70vh',
        minWidth: isVertical ? '80vw' : '70vh',
        maxHeight: isVertical ? '80vw' : '70vh',
        cursor: 'pointer',
        userSelect: 'none'
    },
});

const WordsearchBase = (props) => {
    const styles = useStyles();

    const {
        size,
        list
    } = props;

    const [state, setState] = useState({
        letters: Grid(list, size),
        mouseStart: false,
        selected: []
    });

    const baseRef = useRef(null);

    useEffect(() => {
        setState((s) => ({...s, letters: Grid(list, size)}));
    }, [list]);

    const tileSize = baseRef.current && R.path(['current', 'clientWidth'], baseRef) / size;

    // draws line and highlights tiles in that line
    const handleClick = (e) => {
        const { x, y } = baseRef.current.getBoundingClientRect();   // get offset of grid
        // starting coordinates
        const startX = Math.floor((state.mouseStart.clientX - x) / tileSize);
        const startY = Math.floor((state.mouseStart.clientY - y) / tileSize);
        const startIndex = startX + startY * size;
        // coordinates of current mouse pos
        const clickX = Math.floor((e.clientX - x) / tileSize);
        const clickY = Math.floor((e.clientY - y) / tileSize);
        // slope from start to current
        const slope = Math.abs((clickY - startY) / (clickX - startX));

        const selected = [startIndex];
        var i = 0;  // reset iterator
        if (slope === Infinity) {
            // vertical line
            const length = clickY - startY;
            for(i = 1; i < Math.abs(length) + 1; i++) {
                selected.push(length > 0 ?
                    startIndex + size * i :
                    startIndex - size * i);
            }
        } else if (slope === 0) {
            // horizontal line
            const length = clickX - startX;
            for(i = 1; i < Math.abs(length) + 1; i++) {
                selected.push(length > 0 ?
                    startIndex + i :
                    startIndex - i);
            }
        } else if (slope === 1) {
            // diagonal line
            const xLength = clickY - startY;
            const yLength = clickX - startX;
            for(i = 1; i < Math.abs(xLength) + 1; i++) {
                selected.push(xLength > 0 && yLength > 0 ? startIndex + i + size * i :  // right down
                    xLength < 0 && yLength > 0 ? startIndex + i - size * i :            // right up
                    xLength > 0 && yLength < 0 ? startIndex - i + size * i :            // left down
                    startIndex - i - size * i);                                         // left up
            }
        }
        setState((s) => ({...s, selected: selected}));
    }

    return (
        <div className={styles.base} ref={baseRef} 
             onMouseDown={(e) => setState((s) => 
                    ({...s, mouseStart: e})
                )} 
             onMouseUp={() => setState((s) => 
                    ({...s, mouseStart: null})
                )}
             onMouseMove={(e) => state.mouseStart && handleClick(e)}
             onMouseLeave={() => setState((s) => 
                    ({...s, mouseStart: null})
                )}>
            {tileSize && 
            <GridList cols={size}>
                {state.letters.map((letter, idx) => {
                    return <LetterTile 
                                tile={letter} 
                                size={tileSize}
                                key={letter + idx}/>
                })}
            </GridList>}
        </div>
    )
}

export default WordsearchBase;