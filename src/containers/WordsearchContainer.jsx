import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { R, isVertical, shuffle } from '../globals/variables.jsx';
import colors from '../globals/colors.js';
import { fetchWords, saveWord } from '../globals/fetchAPI.js';
import Button from '../components/Button.jsx';
import SizeSlider from '../components/SizeSlider.jsx';
import FinishedModal from '../components/FinishedModal.jsx';
import WordsearchBase from '../wordsearch/components/WordsearchBase.jsx';
import WordList from '../wordsearch/components/WordList.jsx';

const useStyles = createUseStyles({
    contentArea: {
        width: '100vw',
        maxWidth: '100vw',
        height: '92vh',
        overflow: 'hidden',
        touchAction: 'none'
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
            setState((s) => ({ ...s, words: src[0].map((x, i) => {
                    return {
                        label: x.word,
                        word: x.word.toLowerCase().split(" ").join(""),
                        categories: x.category.split(','),
                        found: false,
                        index: i
                    }
                }) 
            }));
        }, []);
    }, []);

    return state;
}

// gets list of words for search
const getUsedWords = (size, list) => {
    if(R.isEmpty(list)) return null;

    const array = [];
    const words = shuffle(R.clone(list));

    while(array.length < size - 2) {
        const elem = words.pop();
        const { word } = elem;
        if(word.length > size || array.includes(elem)) continue;
        array.push(elem);
        if(R.isEmpty(words)) break; // break if no more words
    }

    return array;
}

const saveWords = [
    // {word: 'Sloth', category: 'animal,mammal'},
]

const WordsearchNav = (props) => {
    const styles = useStyles();

    const {
        setSize,
        resetSearch
    } = props;

    return (
        <div id={'wordsearch-nav'} className={styles.nav}>
            <SizeSlider setSize={setSize} sizes={[10, 12, 14, 16, 18]}/>
            <Button title={'Start'} action={() => resetSearch()} />
            {/* <Button title={'Save'} action={() => saveWords.forEach(x => saveWord(x.word, x.category))} /> */}
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
        resetLetters: false,
        finished: false,
    });

    // full list of words
    const { words } = GetWords();

    useEffect(() => {
        // list of words filtered by selected category
        const list = words && (state.category === 'all' ? words :
            words.filter(x => x.categories.includes(state.category)));
        // list of words (length = size)
        setState((s) => ({
            ...s, 
            finished: false,
            resetLetters: !s.resetLetters,
            words: list && getUsedWords(state.size, list)
        }))
    }, [words, state.reset]);

    // check if completed
    useEffect(() => {
        if(state.words && R.isEmpty(state.words.filter(R.propEq('found', false))))
            setState((s) => ({
                ...s, 
                finished: true,
            }))
    }, [state.words]);

    return (
        <div className={styles.contentArea}>
            <WordsearchNav
                setSize={(size) => setState((s) =>
                    ({...s, size: size, reset: !s.reset})
                )}
                resetSearch={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )}  />
            {state.words && 
            <div style={{display: 'flex', flexDirection: isVertical ? 'column' : 'row'}}>
            <WordsearchBase
                list={state.words} 
                size={state.size}
                reset={state.resetLetters}
                setLoading={(x) => setState((s) => 
                    ({...s, isLoading: x})
                )}
                resetSearch={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )}
                foundWord={(index) => setState((s) =>
                    ({...s, words: R.assocPath([index, 'found'], true, s.words)})
                )} />
            <WordList list={state.words} />
            </div>}
            <FinishedModal 
                isOpen={state.finished}
                completeAction={() => setState((s) => 
                    ({...s, reset: !s.reset})
                )} />
        </div>
    )
}

export default WordsearchContainer;