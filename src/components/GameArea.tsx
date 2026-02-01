import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import {useStores} from '../stores/RootStore';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import Letter from '../components/Letter';
import CategorySelect from './CategorySelect';

const StyledLetterContainer = styled.div<{ $timeOver?: boolean }>`
    display: grid;
    grid-template-columns: repeat(4, minmax(60px, 100px));
    grid-template-rows: repeat(5, minmax(80px, 120px));
    gap: 6px;
    justify-content: center;

    ${({ $timeOver }) =>
        $timeOver &&
        `
        animation: shake 0.5s;

        @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            25% { transform: translate(-1px, -2px) rotate(-1deg); }
            50% { transform: translate(-1px, 2px) rotate(1deg); }
            75% { transform: translate(1px, 0px) rotate(0deg); }
            100% { transform: translate(1px, -1px) rotate(1deg); }
        }
    `};
`;

const StyledGameArea = styled.div<{ $timeWarning?: boolean, $timeOver?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100vh;
    display: flex;

    ${({ $timeWarning, $timeOver }) => {
        if ($timeOver) {
            return `
            background-color: var(--color-warning);
        `;
        }
        if ($timeWarning) {
            return `
            animation: flash 1s infinite;

            @keyframes flash {
                0%, 100% { background-color: var(--color-background); }
                50% { background-color: var(--color-warning); }
            }
        `;
        }

        return null;
    }};
`;

const StyledButton = styled(Button)`
    && {
        height: 50px;
        width: 200px;
        font-size: 16px;
        border: 3px solid var(--text-primary);
        border-radius: 25px;
        background-color: var(--color-background);
        color: var(--text-primary);
        text-transform: none; /* Removes MUI's default uppercase */
        
        &:hover {
            background-color: var(--color-secondary);
            color: var(--text-primary);
            border: 3px solid var(--text-primary);
        }
    }
`;

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    height: 400px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: var(--background);
    color: var(--text-primary);
    padding: 20px;
    border-radius: 8px;
    outline: none;
    border: 3px solid var(--text-primary);
`;

const GameArea: React.FC = observer(() => {
    const { tappleStore } = useStores();
    const [open, setOpen] = useState(false);
    const [canClose, setCanClose] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setCanClose(false);
        
        // Allow closing after 1 seconds
        setTimeout(() => {
            setCanClose(true);
        }, 1000);
    };
    const handleClose = () => {
        if (canClose) {
            setOpen(false);
        }
    };

    const LetterList = tappleStore.letters;

    const handleResetGame = () => {
        tappleStore.resetGame();
    };

    useEffect(() => {
        if (tappleStore.timeOver) {
            handleOpen();
        }
    }, [tappleStore.timeOver]);

    return (
        <StyledGameArea $timeWarning={tappleStore.timeWarning} $timeOver={tappleStore.timeOver}>
            <StyledModal
                open={open}
                onClose={handleClose}
            >
                <ModalContent>
                    <Typography id="modal-modal-title" variant="h6">Time's Up!</Typography>
                    <StyledButton onClick={handleClose}>
                        <Typography variant="h6">Next Player</Typography>
                    </StyledButton>
                </ModalContent>
            </StyledModal>
            <CategorySelect />
            <StyledLetterContainer $timeOver={tappleStore.timeOver}>
                {LetterList.map((letter) => (
                    <Letter key={letter.char} char={letter.char} />
                ))}
            </StyledLetterContainer>
            <StyledButton onClick={handleResetGame}>
                <Typography variant="h6">Reset Game</Typography>
            </StyledButton>
        </StyledGameArea>
    );
});

export default GameArea;
