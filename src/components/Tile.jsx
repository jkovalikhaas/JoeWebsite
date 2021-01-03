import React, {useEffect, useState } from 'react';
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
    last: colors.joeRed,
    visited: colors.joeViolet,
    solution: colors.joeGreen,
}

const Tile = (props) => {
    const styles = useStyles();

    const {
        tile,
    } = props;

    const {
        x, y,
        index,
        value,
        neighbors
    } = tile;

    const isOpen = (dir) => R.path([dir, 'open'], neighbors) ? tileColors[value] : colors.joeDarkBlue;

    return (
        <div key={`${x}, ${y}`} className={styles.base}
            style={{backgroundColor: tileColors[value],
                    borderTopColor: isOpen('north'), borderBottomColor: isOpen('south'),
                    borderRightColor: isOpen('east'), borderLeftColor: isOpen('west')}}>

        </div>
    )
}

export default Tile;