import React from 'react';
import '../index.css';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import { isMobile } from 'react-device-detect';
import GridList from '@material-ui/core/GridList';

import ftp from '../assets/images/ftp-icon.jpg';
import gitW from '../assets/images/github-icon-white.png';
import linked from '../assets/images/linkedn-logo.png';

const linkList = [
    {
        name: "GitHub",
        link: "https://github.com/jkovalikhaas",
        icon: gitW
    },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/joseph-kovalik-haas-29a615150/",
        icon: linked
    },
    {
        name: "Fancy Tile Puzzle",
        link: "https://apps.apple.com/us/app/fancy-tile-puzzle/id1462511327",
        icon: ftp
    }
];

const tileSize = isMobile ? '54vw' : '16vw';

const useStyles = createUseStyles({
    content: {

    },
    grid: {
        width: '54vw',
        margin: '120px auto 0 auto' 
    },
    tile: {
        minWidth: tileSize,
        maxWidth: tileSize,
        minHeight: tileSize,
        maxHeight: tileSize,

        borderRadius: '5px',
        // border: '1px solid #000000',
        marginBottom: '4vw',
        background: `radial-gradient(${colors.joeGrayBlue}, ${colors.joeDarkGrayBlue})`,
    },
    tileIcon: {
        width: '50%',
        maxWidth: '50%',
        height: '50%',
        maxHeight: '50%',
        margin: '10% 25% 0 25%'
    }
});

export const HomeGrid = () => {
    const styles = useStyles();

    return (
        <div className={styles.content}>
            <div className={styles.grid}>
                <GridList cols={isMobile ? 1 : 3}>
                {linkList.map((x, i) => {
                    return (
                        <a key={x.icon} className={styles.tile} target={"_blank"} href={x.link}
                           style={{marginRight: (i % 2 === 0 && i !== 0) || isMobile ? '0px' : '2vw'}}>
                                <img className={styles.tileIcon} src={x.icon} alt={''} />
                        </a>
                    )
                })}
                </GridList>
            </div>
        </div>
    )
};

export default HomeGrid;