import React, {useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import GridList from '@material-ui/core/GridList';
import Tile from './Tile.jsx';

const useStyles = createUseStyles({
    base: {
        position: 'absolute',
        top: '18vh',
        right: 0,
        opacity: '0.5',
        borderRadius: '5px'
    },
    tile: {
        width: '4px',
        height: '4px',
        borderStyle: 'solid',
        borderWidth: '1px'
    }
});

const MiniMap = (props) => {
    const styles = useStyles();

    const {
        width,
        maze
    } = props;

    return (
        <div className={styles.base}
             style={{maxWidth: width * 6}}>
            <GridList cols={width}>
                {maze.map(tile => {
                   return (
                       <Tile tile={tile} key={tile.index} className={styles.tile} />
                   ) 
                })}
           </GridList>
        </div>
    )
}

export default MiniMap;