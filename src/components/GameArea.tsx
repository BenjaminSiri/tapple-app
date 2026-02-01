import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { observer } from 'mobx-react-lite';
import {useStores} from '../stores/RootStore';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';

import Letter from '../components/Letter';
import CategorySelect from './CategorySelect';

const float = keyframes`
    from {
        transform: translateX(-200px);
    }
    to {
        transform: translateX(calc(100vw + 200px));
    }
`;

const BackgroundLetters = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
`;

const FloatingLetter = styled.span<{ $delay: number; $duration: number; $top: number }>`
    position: absolute;
    left: -200px;
    font-size: 80px;
    font-weight: bold;
    color: rgba(200, 200, 200, 0.15);
    top: ${({ $top }) => $top}%;
    animation: ${float} ${({ $duration }) => $duration}s linear ${({ $delay }) => $delay}s infinite;
    user-select: none;
`;

const StyledLetterContainer = styled.div<{ $timeOver?: boolean }>`
    display: grid;
    grid-template-columns: repeat(4, 80px);
    grid-template-rows: repeat(5, 100px);
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
        background-color: var(--background); !important;
        color: var(--text-primary);
        text-transform: none;
        
        &:hover {
            background-color: var(--text-secondary);
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

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 400px;
`;

const StyledIconButton = styled(IconButton)`
    && {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        
        &:hover {
            background-color: var(--color-secondary);
        }
        
        & svg {
            font-size: 50px;
            color: var(--text-primary);
        }
    }
`;

const GameArea: React.FC = observer(() => {
    const { tappleStore } = useStores();
    const [openTimeUpModal, setOpenTimeUpModal] = useState(false);
    const [canCloseTimeUpModal, setCanCloseTimeUpModal] = useState(false);
    const [openHelpModal, setOpenHelpModal] = useState(false);

    const handleOpen = () => {
        setOpenTimeUpModal(true);
        setCanCloseTimeUpModal(false);

        // Allow closing after 1 seconds
        setTimeout(() => {
            setCanCloseTimeUpModal(true);
        }, 1000);
    };
    const handleClose = () => {
        if (canCloseTimeUpModal) {
            setOpenTimeUpModal(false);
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

    const backgroundLetters = Array.from({ length: 20 }, () => ({
        char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        top: Math.random() * 90
    }));

    return (
        <StyledGameArea $timeWarning={tappleStore.timeWarning} $timeOver={tappleStore.timeOver}>
            <BackgroundLetters>
                {backgroundLetters.map((letter, i) => (
                    <FloatingLetter
                        key={i}
                        $delay={letter.delay}
                        $duration={letter.duration}
                        $top={letter.top}
                    >
                        {letter.char}
                    </FloatingLetter>
                ))}
            </BackgroundLetters>

            <StyledModal
                open={openTimeUpModal}
                onClose={handleClose}
            >
                <ModalContent>
                    <Typography id="modal-modal-title" variant="h6">Time's Up!</Typography>
                    <StyledButton onClick={handleClose}>
                        <Typography variant="h6">Next Player</Typography>
                    </StyledButton>
                </ModalContent>
            </StyledModal>

            <StyledModal
                open={openHelpModal}
                onClose={() => setOpenHelpModal(false)}
            >
                <ModalContent>
                    <Typography id="modal-modal-title" variant="h6">How to Play</Typography>
                    <Typography id="modal-modal-description">
                        Select a category and take turns naming items that fit within that category.
                        Tap letters as you think of them. Try to think quickly before time runs out!
                    </Typography>
                    <StyledButton onClick={() => setOpenHelpModal(false)}>
                        <Typography variant="h6">Close</Typography>
                    </StyledButton>
                </ModalContent>
            </StyledModal>

            <StyledHeader>
                <CategorySelect />
                <StyledIconButton onClick={() => setOpenHelpModal(true)}>
                    <HelpIcon />
                </StyledIconButton>
            </StyledHeader>

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
