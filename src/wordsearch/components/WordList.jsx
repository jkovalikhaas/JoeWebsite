import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { R, isVertical } from '../../globals/variables.jsx';
import colors from '../../globals/colors.js';
import GridList from '@material-ui/core/GridList';

const useStyles = createUseStyles({
    base: {
        margin: isVertical ? '4vh auto 4vh auto' : '4vh 0 4vh 4vw',
        maxWidth: isVertical ? '80vw' : '32vw',
        minWidth: isVertical ? '80vw' : '32vw',
        maxHeight: isVertical ? '80vw' : '30vh',
    },
    word: {
        color: colors.joeWhite,
        fontSize: isVertical ? '12px' : '16x',
        maxHeight: isVertical ? '20px' : '24px',
        maxWidth: isVertical ? '30%' : '15vw'
    }
});

const WordList = (props) => {
    const styles = useStyles();

    const {
        list
    } = props;

    const sorted = R.sortBy(R.prop('word'))(list);

    return (
        <div className={styles.base}>
            <GridList cols={isVertical ? 3 : 1}>
                {sorted.map((word, idx) => {
                    const { label, found } = word;
                    return (
                        <div className={styles.word} key={word + idx} 
                             style={{textDecoration: found ? 'line-through' : 'none'}}>
                            {idx + 1}. {label}
                        </div>
                    )
                })}
            </GridList>
        </div>
    )
}

export default WordList;