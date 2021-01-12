import React, {useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh - 60px',
        overflow: 'hidden',
    },
});

const WordsearchContainer = () => {
    const styles = useStyles();

    return (
        <div className={styles.contentArea}>

        </div>
    )
}

export default WordsearchContainer;