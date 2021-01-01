import React, {useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { R } from '../globals/variables.jsx';
import colors from '../globals/colors.js';

const useStyles = createUseStyles({
    base: {
        height: '6vh',
        width: '6vh',
        borderStyle: 'solid',
        borderWidth: '2px',
    }
});

const tileColors = {
    default: colors.joeLightBlue,
    0: colors.joeLightBlue,
    current: '',
    start: '',
    end: '',
    visited: '',
    solution: '',
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

    const [state, setState] = useState({
        value: value
    });

    const isOpen = (dir) => R.path([dir, 'open'], neighbors) ? colors.joeLightBlue : colors.joeDarkBlue;

    return (
        <div key={`${x}, ${y}`} className={styles.base}
            style={{backgroundColor: tileColors[value],
                    borderTopColor: isOpen('north'), borderBottomColor: isOpen('south'),
                    borderRightColor: isOpen('east'), borderLeftColor: isOpen('west')}}>

        </div>
    )
}

export default Tile;