import React from 'react';
import { createUseStyles } from 'react-jss';
import { R, tileSize } from '../../globals/variables.jsx';
import colors from '../../globals/colors.js';

const useStyles = createUseStyles({
    base: {
        borderStyle: 'solid',
        borderWidth: '2px',
        boxSizing: 'border-box',
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
        size,
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
            style={{minWidth: size, minHeight: size, maxWidth: size, maxHeight: size,
                    backgroundColor: tileColors[value],
                    borderTopColor: isOpen('north'), borderBottomColor: isOpen('south'),
                    borderRightColor: isOpen('east'), borderLeftColor: isOpen('west')}}>

        </div>
    )
}

export default Tile;