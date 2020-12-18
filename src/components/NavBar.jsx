import React from 'react';
import '../index.css';
import { createUseStyles } from 'react-jss';
import { isMobile } from 'react-device-detect';
import colors from '../globals/colors.js';

const useStyles = createUseStyles({
    bar: {
        height: '60px',
        backgroundColor: colors.joeDarkBlue,
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
    },
    title: {
        fontSize: isMobile ? '20px' : '32px',
        fontWeight: '500',
        color: colors.joeWhite,
        margin: '12px auto 0 auto',
    },
});

export const NavBar = () => {
    const styles = useStyles();

    return (
        <div className={styles.bar}>
            <div className={styles.title}>
                Joe Kovalik-Haas
            </div>
        </div>
    );
};

export default NavBar;