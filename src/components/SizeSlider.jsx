import React from 'react';
import { createUseStyles } from 'react-jss';
import colors from '../globals/colors.js';
import { tileSize } from '../globals/variables.jsx';
import { isMobile } from "react-device-detect";
import Slider from '@material-ui/core/Slider';


const useStyles = createUseStyles({
    base: {
        height: tileSize * 0.5,
        width: isMobile ? tileSize * 2 : tileSize * 2.5,
        padding: '1vh 2vh 3vh 2vh',
        borderRadius: '10px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        fontSize: '1.5vh',
        textAlign: 'center',
        backgroundColor: colors.joeDarkBlue,
        color: colors.joeWhite
    },
    slider: {
        marginTop: isMobile ? '-10px' : '0'
    },
    thumb: {
        color: colors.joeWhite
    },
    mark: {
        color: colors.joeWhite
    },
    rail: {
        color: colors.joeWhite
    },
    track: {
        color: colors.joeWhite
    },
    valueLabel: {
        color: colors.joeDarkGrayBlue,
    }
});

const SizeSlider = (props) => {
    const styles = useStyles();

    const {
        setSize
    } = props;

    return (
        <div className={styles.base}>
            Size
            <Slider
                className={styles.slider}
                classes={{
                    thumb: styles.thumb,
                    rail: styles.rail,
                    track: styles.track,
                    mark: styles.mark,
                    valueLabel: styles.valueLabel
                }}
                valueLabelDisplay="auto"
                defaultValue={1}
                step={1}
                marks
                min={1}
                max={4}
                onChangeCommitted={(event, value) => {
                    const size = value * 10 + 1;
                    setSize(size, size);
                }}/>
        </div>
    )
}

export default SizeSlider;