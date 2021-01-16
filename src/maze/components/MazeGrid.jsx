import React, { useRef } from 'react';
import { createUseStyles } from 'react-jss';
import { R, isVertical } from '../../globals/variables';
import GridList from '@material-ui/core/GridList';
import Tile from './Tile.jsx';

const useStyles = createUseStyles({
    base: {
        margin: '4vh auto 4vh auto',
        borderRadius: '5px',
        maxWidth: isVertical ? '80vw' : '70vh',
        minWidth: isVertical ? '80vw' : '70vh',
        maxHeight: isVertical ? '80vw' : '70vh',
    },
});

const MazeGrid = (props) => {
    const styles = useStyles();

    const {
        size = 11,
        grid,
        swipeHandlers
    } = props;

    const baseRef = useRef(null);

    const tileSize = baseRef.current && R.path(['current', 'clientWidth'], baseRef) / size;

    return (
        <div id={'maze-grid'} className={styles.base} {...swipeHandlers} ref={baseRef}>
           <GridList cols={size}>
                {grid.map(tile => {
                   return (
                       <Tile tile={tile} key={tile.index} size={tileSize}/>
                   ) 
                })}
           </GridList>
        </div>
    )
}

export default MazeGrid;