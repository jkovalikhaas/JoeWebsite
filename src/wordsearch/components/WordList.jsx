import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { isVertical } from '../../globals/variables.jsx';
import colors from '../../globals/colors.js';
import GridList from '@material-ui/core/GridList';

const useStyles = createUseStyles({
    base: {
        margin: isVertical ? '4vh auto 4vh auto' : '4vh 0 4vh 4vw',
        maxWidth: isVertical ? '80vw' : '30vh',
        minWidth: isVertical ? '80vw' : '30vh',
        maxHeight: isVertical ? '80vw' : '30vh',
    },
    word: {
        color: colors.joeWhite,
        fontSize: isVertical ? '12px' : '16x',
        maxHeight: isVertical ? '20px' : '24px',
        maxWidth: isVertical ? '30%' : '15vh'
    }
});

const WordList = (props) => {
    const styles = useStyles();

    const {
        list
    } = props;

    return (
        <div className={styles.base}>
            <GridList cols={isVertical ? 3 : 1}>
                {list.map((word, idx) => {
                    const { label, found } = word;
                    return (
                        <div className={styles.word} key={word + idx}
                             textDecoration={found ? 'lineThrough' : 'none'}>
                            {idx + 1}. {label}
                        </div>
                    )
                })}
            </GridList>
        </div>
    )
}

export default WordList;