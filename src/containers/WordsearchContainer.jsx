import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { R } from '../globals/variables.jsx';
import { fetchWords } from '../globals/fetchAPI.js';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh - 60px',
        overflow: 'hidden',
    },
});

const GetWords = () => {
    const [state, setState] = useState({});

    useEffect(() => {
        Promise.all([fetchWords()]).then((src) => {
            setState((s) => ({ ...s, words: src[0].map(x => {
                    return {
                        word: x.word,
                        category: x.category,
                        subCategory: x.category
                    }
                }) 
            }));
        }, []);
    }, []);

    return state;
}

const WordsearchContainer = () => {
    const styles = useStyles();

    const [state, setState] = useState({

    });

    const { words } = GetWords();

    const animals = words && words.filter(R.propEq('category', 'animal'));
    console.log(animals)

    return (
        <div className={styles.contentArea}>

        </div>
    )
}

export default WordsearchContainer;