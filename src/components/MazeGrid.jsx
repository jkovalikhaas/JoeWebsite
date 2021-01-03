import React, {useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import { counting, isMobile } from '../globals/variables';
import GridList from '@material-ui/core/GridList';
import Tile from './Tile.jsx';

const useStyles = createUseStyles({
    base: {
        maxWidth: 'calc(60vh + 40px)',
        margin: '4vh auto 4vh auto',
        backgroundColor: colors.joeDarkBlue,
        borderRadius: '5px',
    }
});

const MazeGrid = (props) => {
    const styles = useStyles();

    const {
        width,
        height,
        grid
    } = props;

    return (
        <div className={styles.base}>
           <GridList cols={width}>
                {grid.map(tile => {
                   return (
                       <Tile tile={tile} key={tile.index} />
                   ) 
                })}
           </GridList>
        </div>
    )
}

export default MazeGrid;