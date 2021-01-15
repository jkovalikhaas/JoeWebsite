import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { isVertical, R, shuffle } from '../globals/variables.jsx';
import colors from '../globals/colors.js';
import { fetchWords } from '../globals/fetchAPI.js';
import Button from '../components/Button.jsx';
import WordsearchBase from '../wordsearch/components/WordsearchBase.jsx';
import WordList from '../wordsearch/components/WordList.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh - 60px',
        overflow: 'hidden',
    },
    nav: {
        height: '6vh',
        margin: '2vh 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: colors.joeDarkGrayBlue
    },
});

// fetch list of words from aws
const GetWords = () => {
    const [state, setState] = useState({});

    useEffect(() => {
        Promise.all([fetchWords()]).then((src) => {
            setState((s) => ({ ...s, words: src[0].map(x => {
                    return {
                        label: x.word,
                        word: x.word.toLowerCase().split(" ").join(""),
                        categories: x.category.split(','),
                        found: false
                    }
                }) 
            }));
        }, []);
    }, []);

    return state;
}

// gets list of words for search
const getUsedWords = (size, list) => {
    const array = [];
    const words = shuffle(R.clone(list));
    while(array.length < size) {
        const elem = words.pop();
        const { word } = elem;
        if(word.length > size || array.includes(elem)) continue;
        array.push(elem);
        if(R.isEmpty(words)) break; // break if no more words
    }
    return array;
}

const WordsearchNav = (props) => {
    const styles = useStyles();

    const {
        resetSearch
    } = props;

    return (
        <div id={'wordsearch-nav'} className={styles.nav}>
            <Button title={'Start'} action={() => resetSearch()} />
        </div>
    )
}

const WordsearchContainer = () => {
    const styles = useStyles();

    const [state, setState] = useState({
        category: 'animal',
        words: null,
        size: 10,
        reset: false,
        finished: false
    });

    // full list of words
    const { words } = GetWords();

    useEffect(() => {
        // list of words filtered by selected category
        const list = words && (state.category == 'all' ? words :
            words.filter(x => x.categories.includes(state.category)));
        // list of words (length = size)
        setState((s) => ({
            ...s, 
            words: list && getUsedWords(state.size, list)
        }))
    }, [words, state.reset]);

    return (
        <div className={styles.contentArea}>
            <WordsearchNav 
                resetSearch={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )}  />
            {state.words && 
            <div style={{display: 'flex', flexDirection: isVertical ? 'column' : 'row'}}>
            <WordsearchBase 
                list={state.words} 
                size={state.size} />
            <WordList list={state.words} />
            </div>}
        </div>
    )
}

export default WordsearchContainer;