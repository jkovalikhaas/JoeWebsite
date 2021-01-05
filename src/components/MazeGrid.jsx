import React, {useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import { tileSize, screenSize } from '../globals/variables';
import GridList from '@material-ui/core/GridList';
import Tile from './Tile.jsx';

const useStyles = createUseStyles({
    base: {
        margin: '4vh auto 4vh auto',
        borderRadius: '5px',
    },
});

const MazeGrid = (props) => {
    const styles = useStyles();

    const {
        width = 11,
        grid,
        swipeHandlers
    } = props;

    return (
        <div id={'maze-grid'} className={styles.base} {...swipeHandlers}
             style={{maxWidth: `${tileSize * width + (width * 4)}px`}}>
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