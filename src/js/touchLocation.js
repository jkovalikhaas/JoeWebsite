/*
    determines the 'quadrant' users presses and returns the 
    related keyboard key value: (ArrowUp, ArrowDown, ArrowLeft, ArrowRight) 
*/

const touchLocation = (elem, x, y) => {
    // (right, bottom) = bottom right coordinates of elem
    // (left, top) = top left coordinates of elem
    const { bottom, right, top, left } = elem.getBoundingClientRect();
    const line = (bottom / right) * x;
    // ensure inside of grid
    if(y >= top && y <= bottom && x >= left && x <= right) {
        const corner = y > line ? ["ArrowLeft", "ArrowDown"] : ["ArrowUp", "ArrowRight"];
        return y < -line + bottom ? corner[0] : corner[1];
    }
    return null;
}

export default touchLocation;