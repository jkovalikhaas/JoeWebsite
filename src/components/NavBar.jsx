import React from 'react';
import '../index.css';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import { isVertical } from '../globals/variables.jsx';
import { R } from '../globals/variables.jsx';

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
    homeButton: {
        position: 'absolute',
        color: colors.joeWhite,
        margin: '2.5vh 1vh 0 10px',
        padding: '2px 4px',
        textDecoration: 'none',
        backgroundColor: colors.joeDarkGrayBlue,
        borderRadius: '5px',
        fontSize: isVertical ? '12px' : '16px',
        height: isVertical ? '18px' : '22px',
    }
});

export const NavBar = ({history}) => {
    const styles = useStyles();

    const urlPath = R.path(['location', 'pathname'], history);
    const isHome = urlPath.includes('home') || R.equals(urlPath, '/');

    return (
        <div className={styles.bar}>
            {!isHome &&
            <a className={styles.homeButton} href={'/home'}>
                Home
            </a>}
            <a className={styles.title} href={"/home"}>
                Joe Kovalik-Haas
            </a>
        </div>
    );
};

export default NavBar;