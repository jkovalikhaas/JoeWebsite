import React, {useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import HomeGrid from '../components/HomeGrid.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh - 60px',
        overflow: 'hidden',
    },
});

const HomeContainer = () => {
    const styles = useStyles();

    return (
      <div className={styles.contentArea}>
        <HomeGrid />
      </div>
    );
};

export default HomeContainer;