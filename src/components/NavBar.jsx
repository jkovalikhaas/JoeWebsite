import React from 'react';
import '../index.css';
import { createUseStyles } from 'react-jss';
import { isMobile } from 'react-device-detect';
import colors from '../globals/colors.js';

const useStyles = createUseStyles({
    bar: {
        height: '8vh',
        backgroundColor: colors.joeDarkBlue,
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        display: 'flex',
    },
    title: {
        fontSize: '4vh',
        fontWeight: '500',
        color: colors.joeWhite,
        margin: '1.5vh auto 0 auto',
        textDecoration: 'none'
    },
});

export const NavBar = () => {
    const styles = useStyles();

    return (
        <div className={styles.bar}>
            <a className={styles.title} href={"/home"}>
                Joe Kovalik-Haas
            </a>
        </div>
    );
};

export default NavBar;