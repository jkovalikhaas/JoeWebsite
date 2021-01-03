import React, {useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';

const useStyles = createUseStyles({
    button: {
        height: '2vh',
        width: '10vh',
        padding: '1.5vh 2vh 2.5vh 2vh',
        cursor: 'pointer',
        borderRadius: '10px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        fontSize: '2vh',
        textAlign: 'center'
    },
});

const Button = (props) => {

    const {
        title = "Button",
        bkgColor = colors.joeDarkBlue,
        fgdColor = colors.joeWhite,
        action
    } = props;

    const styles = useStyles();

    return (
        <div className={styles.button} onMouseDown={action} 
             style={{backgroundColor: bkgColor, color: fgdColor}}>
            {title}
        </div>
    )
}

export default Button;