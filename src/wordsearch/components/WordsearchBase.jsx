import React from 'react';
import { createUseStyles } from 'react-jss';
import { tileSize } from '../../globals/variables';
import GridList from '@material-ui/core/GridList';

const useStyles = createUseStyles({
    base: {
        margin: '4vh auto 4vh auto',
        borderRadius: '5px',
    },
});

const WordsearchBase = (props) => {
    const styles = useStyles();

    const {
        words
    } = props;

    return (
        <div className={styles.base}>

        </div>
    )
}