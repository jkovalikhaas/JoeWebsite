import { R, counting, strings, shuffle } from '../../globals/variables.jsx';

// list of directions with their opperations
const fullDirs = [{'up': (i, size) => -(size * i)},
              {'down': (i, size) => size * i},
              {'left': (i) => -i},
              {'right': (i) => i}, 
              {'leftUp': (i, size) => -i - size * i},
              {'leftDown': (i, size) => -i + size * i},
              {'rightUp': (i, size) => i - size * i},
              {'rightDown': (i, size) => i + size * i}
            ];

// gets random letter from alphabet
export const getRandomLetter = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// attempts to place word in grid
const placeWord = (grid, word, start, dir, size) => {
    var temp = [...grid];
    const dirStr = R.head(Object.keys(dir));
    const x = start % size;
    const y = Math.floor(start / size);

    // check for edge overflow
    if(dirStr.toLowerCase().includes('up') && y < word.length) return null;
    if(dirStr.toLowerCase().includes('down') && y > size - word.length) return null;
    if(dirStr.toLowerCase().includes('left') && x < word.length) return null;
    if(dirStr.toLowerCase().includes('right') && x > size - word.length) return null;

    for(var i = 0; i < word.length; i++) {
        const index = start + R.head(Object.values(dir))(i, size);
        const letter = word[i];
        // checks interect with other words
        if (grid[index] !== "" && grid[index] !== letter) break; 
        else temp[index] = letter;
    }

    return R.equals(i, word.length) ? temp : null;
}

// generate letter objects for each index
const getLetters = (grid) => {
    return grid.map((x, i) => {
        const isPlaced = !R.equals(x, "");
        return {
            letter: isPlaced ? x : getRandomLetter(),
            value: isPlaced ? 1 : 0,
            index: i,
        }
    })
}

// node to be added to stack
const Node = (word, size, grid = strings(size * size)) => {
    return {
        grid: grid,
        word: word,
        dirs: shuffle([...fullDirs]),
        positions: shuffle(counting(size * size))
    }
}

const Grid = (list, size) => {
    const words = list.map(R.prop('word'));
    var stack = [Node(words.pop(), size)];
    var finalGrid = null;

    while (true) {
        var current = R.last(stack);
        // was unable to place list of words
        if (R.isNil(current)) break;
        // no more directions, reset dirs at new position
        if (R.isEmpty(current.dirs)) {
            current.positions.pop();
            current.dirs = shuffle([...fullDirs]);
        }

        if (R.isEmpty(current.positions)) {
            // no possible positions for this word
            words.push(current.word);   // add word back to list
            stack.pop() // remove current from stack
        } else {
            const temp = placeWord(current.grid, current.word, R.last(current.positions), current.dirs.pop(), size);
            if(!R.isNil(temp)) {
                // word was placed sucessfully
                if(R.isEmpty(words)) { finalGrid = temp; break; } // all words placed
                else stack.push(Node(words.pop(), size, temp));   // add another word
            }
        }
    }

    return getLetters(R.isNil(finalGrid) ? strings(size * size) : finalGrid);
}

export default Grid;