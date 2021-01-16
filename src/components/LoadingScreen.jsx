import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import { isVertical } from "../globals/variables.jsx";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = createUseStyles({
    loading: {

    },
    label: {
        marginTop: '30%',
        fontSize: isVertical ? '20px' : '24px',
        color: colors.joeLightBlue,
        marginBottom: '2vh'
    },
    circle: {
        color: colors.joeLightBlue
    }
});

const LoadingScreen = (props) => {
    const styles = useStyles();

    const {
        className
    } = props;

    return (
        <div className={className}>
            <div className={styles.label}>Loading...</div>
            <CircularProgress 
                className={styles.loading}
                classes={{circle: styles.circle}} />
        </div>
    )
}

export default LoadingScreen;