import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { R, isVertical } from '../../globals/variables.jsx';
import colors from '../../globals/colors.js';
import GridList from '@material-ui/core/GridList';
import Letters from '../js/generateLetters.js';
import LetterTile from './LetterTile.jsx';

const useStyles = createUseStyles({
    base: {
        margin: isVertical ? '4vh auto 4vh auto' : '4vh 0 4vh 4vw',
        borderRadius: '5px',
        maxWidth: isVertical ? '80vw' : '70vh',
        minWidth: isVertical ? '80vw' : '70vh',
        maxHeight: isVertical ? '80vw' : '70vh',
        backgroundColor: colors.joeLightBlue,
    },
});

const WordsearchBase = (props) => {
    const styles = useStyles();

    const {
        size,
        list
    } = props;

    const [state, setState] = useState({
        letters: Letters(size),
        temp: false
    });

    const baseRef = useRef(null);

    useEffect(() => {
        setState((s) => ({...s, temp: !s.temp}));
    }, []);

    const tileSize = baseRef.current && R.path(['current', 'clientWidth'], baseRef) / size;

    return (
        <div className={styles.base} ref={baseRef}>
            {tileSize && 
            <GridList cols={size}>
                {state.letters.map((letter, idx) => {
                    return <LetterTile 
                                value={letter} 
                                size={tileSize}
                                key={letter + idx}/>
                })}
            </GridList>}
        </div>
    )
}

export default WordsearchBase;