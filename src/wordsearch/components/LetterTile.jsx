import React from 'react';
import { createUseStyles } from 'react-jss';
import { isVertical } from '../../globals/variables.jsx';
import colors from '../../globals/colors.js';

const useStyles = createUseStyles({
    base: {
        textAlign: 'center',
        color: colors.joeDarkGrayBlue,
        fontWeight: 600,
        boxSizing: 'border-box'
    },
});

const LetterTile = (props) => {
    const styles = useStyles();

    const {
        size,
        value
    } = props;

    return (
        <div className={styles.base} 
             style={{minWidth: size, minHeight: size, maxWidth: size, maxHeight: size, 
                     fontSize: size / 3, paddingTop: size / 4}}>
           {value.letter.toUpperCase()}
        </div>
    )
}

export default LetterTile;