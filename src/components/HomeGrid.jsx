import React from 'react';
import '../index.css';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const linkList = [
    {
        name: "GitHub",
        link: "https://github.com/jkovalikhaas",
        icon: "github-icon-white.png"
    },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/joseph-kovalik-haas-29a615150/",
        icon: "linkedn-logo.png"
    },
    {
        name: "Fancy Tile Puzzle",
        link: "https://apps.apple.com/us/app/fancy-tile-puzzle/id1462511327",
        icon: 'ftp-icon.jpg'
    }
];

const useStyles = createUseStyles({
    content: {
        margin: '60px auto'
    },
    grid: {
        width: '400px'
    },
    tile: {
        width: '100px',
        height: '100px'
    },
    tileIcon: {
        padding: '20px'
    }
});

export const HomeGrid = () => {
    const styles = useStyles();

    return (
        <div className={styles.content}>
            <div className={styles.grid}>
                <GridList cols={3}>
                {linkList.map((x, i) => {
                    return (
                        <GridListTile key={x + i}>
                            {/* <div className={styles.tile}> */}
                                <img src={`../assets/images/${x.icon}`} alt={x.name} />
                            {/* </div> */}
                        </GridListTile>
                    )
                })}
                </GridList>
            </div>
        </div>
    )
};

export default HomeGrid;