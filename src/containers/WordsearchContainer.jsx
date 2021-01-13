import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { isVertical, R } from '../globals/variables.jsx';
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
                        category: x.category,
                        subCategory: x.category,
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
    while(array.length < size) {
        const elem = list[Math.floor(Math.random() * list.length)];
        const { word } = elem;
        if(word.length > size || array.includes(elem)) continue;
        array.push(elem);
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
            <Button title={'Start'} action={() => console.log('start')} />
        </div>
    )
}

const WordsearchContainer = () => {
    const styles = useStyles();

    const [state, setState] = useState({
        category: 'animal',
        size: 10
    });

    const { words } = GetWords();
    
    const list = words && (state.category == 'all' ? words :
        words.filter(R.propEq('category', state.category)));

    const usableList = list && getUsedWords(state.size, list);

    return (
        <div className={styles.contentArea}>
            <WordsearchNav />
            {usableList && 
            <div style={{display: 'flex', flexDirection: isVertical ? 'column' : 'row'}}>
            <WordsearchBase 
                list={usableList} 
                size={state.size} />
            <WordList list={usableList} />
            </div>}
        </div>
    )
}

export default WordsearchContainer;