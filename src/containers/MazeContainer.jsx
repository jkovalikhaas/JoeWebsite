import React, {useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import generateGrid from '../js/generateGrid.js';
import Button from '../components/Button.jsx';
import MazeGrid from '../components/MazeGrid.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '92vh',
        overflow: 'hidden',
    },
    nav: {
        height: '6vh',
        margin: '2vh 4vw',
        justifyContent: 'space-between'
    },
});

const MazeNav = () => {
    const styles = useStyles();

    return (
        <div className={styles.nav}>
            <Button title={'Size'} action={() => console.log('size')}/>
        </div>
    )
}

const MazeContainer = () => {
    const styles = useStyles();

    const width = 10;
    const height = 10;
    const grid = generateGrid();

    return (
      <div className={styles.contentArea}>
          <MazeNav />
          <MazeGrid width={width} height={height} grid={grid} />
      </div>
    );
};

export default MazeContainer;