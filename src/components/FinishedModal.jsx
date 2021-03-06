import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { isMobile } from "react-device-detect";
import { colors } from '../globals/colors.js';
import { tileSize } from '../globals/variables.jsx';
import Modal from '@material-ui/core/Modal';

const useStyles = createUseStyles({
    base: {
        position: 'absolute',
        width: `${tileSize * 5}px`,
        height: `${tileSize * 2}px`,
        margin: 'auto',
        color: colors.joeWhite,
        backgroundColor: colors.joeDarkBlue,
        borderRadius: '10px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        padding: `${tileSize}px`,
        textAlign: 'center'
    },
    title: {
        fontSize: isMobile ? '14px' : '20px'
    },
    button: {
        padding: '5px',
        margin: `${tileSize}px auto 0 auto`,
        borderRadius: '10px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        backgroundColor: colors.joeDarkGrayBlue,
        cursor: 'pointer'
    }
});

const FinishedModal = (props) => {
    const styles = useStyles();

    const {
        isOpen,
        completeAction
    } = props;

    return (
        <Modal
            open={isOpen}
            className={styles.base}
        >
            <>
                <div className={styles.title}>Congratulations!</div>
                <div className={styles.button} onClick={() => completeAction()}>
                    Play Again
                </div>
            </>
        </Modal>
    )
}

export default FinishedModal;