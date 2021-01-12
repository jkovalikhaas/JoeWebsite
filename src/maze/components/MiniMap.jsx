import React from 'react';
import { createUseStyles } from 'react-jss';
import GridList from '@material-ui/core/GridList';
import Tile from './Tile.jsx';

const useStyles = createUseStyles({
    base: {
        position: 'absolute',
        top: '18vh',
        right: 0,
        opacity: '0.7',
        borderRadius: '5px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
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