import { R } from '../../globals/variables.jsx';

const getDirection = () => {
    
}

const addWord = (array, word) => {

}

// gets random letter from alphabet
export const getRandomLetter = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

const Letters = (size = 10, list) => {
    const letters = Array(size * size).fill('').map((x, i) => {
        return {
            letter: getRandomLetter(),
            index: i,
            value: 0
        }
    });
    return letters;
}

export default Letters;