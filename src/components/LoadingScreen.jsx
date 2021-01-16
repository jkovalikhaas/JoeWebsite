import React, { useEffect, useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../../globals/colors.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = createUseStyles({
    base: {

    }
});

const LoadingScreen = (props) => {
    const styles = useStyles();

    const {

    } = props;

    return (
        <div className={styles.base}>
            <CircularProgress />
        </div>
    )
}

export default LoadingScreen;