import React from 'react';
import { createUseStyles } from 'react-jss';
import { R, tileSize } from '../globals/variables.jsx';
import colors from '../globals/colors.js';

const useStyles = createUseStyles({
    base: {
        height: tileSize,
        width: tileSize,
        borderStyle: 'solid',
        borderWidth: '2px',
    }
});

const tileColors = {
    default: colors.joeLightBlue,
    0: colors.joeLightBlue,
    current: colors.joePurple,
    start: colors.joePink,
    last: colors.joePink,
    visited: colors.joeViolet,
    solution: colors.joeGreen,
}

const Tile = (props) => {
    const styles = useStyles();

    const {
        tile,
        tileRef,
        className = styles.base
    } = props;

    const {
        x, y,
        value,
        neighbors
    } = tile;

    const isOpen = (dir) => R.path([dir, 'open'], neighbors) ? tileColors[value] : colors.joeDarkBlue;

    return (
        <div key={`${x}, ${y}`} className={className} ref={tileRef}
            style={{backgroundColor: tileColors[value],
                    borderTopColor: isOpen('north'), borderBottomColor: isOpen('south'),
                    borderRightColor: isOpen('east'), borderLeftColor: isOpen('west')}}>

        </div>
    )
}

export default Tile;