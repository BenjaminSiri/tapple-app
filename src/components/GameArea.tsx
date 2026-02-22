import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/RootStore';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Letter from '../components/Letter';
import CategorySelect from './CategorySelect';
import Modal from './Modal';

const float = keyframes`
    from { transform: translateX(-200px); }
    to { transform: translateX(calc(100vw + 200px)); }
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
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(5, 120px);
    gap: 8px;
    justify-content: center;

    @media (max-width: 768px) {
        grid-template-columns: repeat(4, 100px);
        grid-template-rows: repeat(5, 120px);
        gap: 6px;
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(4, 80px);
        grid-template-rows: repeat(5, 100px);
        gap: 4px;
    }

    ${({ $timeOver }) => $timeOver && `
        animation: shake 0.5s;

        @keyframes shake {
            0%   { transform: translate(1px, 1px) rotate(0deg); }
            25%  { transform: translate(-1px, -2px) rotate(-1deg); }
            50%  { transform: translate(-1px, 2px) rotate(1deg); }
            75%  { transform: translate(1px, 0px) rotate(0deg); }
            100% { transform: translate(1px, -1px) rotate(1deg); }
        }
    `}
`;

const StyledGameArea = styled.div<{ $timeWarning?: boolean; $timeOver?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100vh;

    ${({ $timeWarning, $timeOver }) => {
        if ($timeOver) return `background-color: var(--color-warning);`;
        if ($timeWarning) return `
            animation: flash 1s infinite;
            @keyframes flash {
                0%, 100% { background-color: var(--color-background); }
                50%       { background-color: var(--color-warning); }
            }
        `;
        return null;
    }}
`;

const StyledButton = styled(Button)`
    && {
        height: 50px;
        width: 200px;
        font-size: 16px;
        border: 3px solid var(--text-primary);
        border-radius: 25px;
        background-color: var(--background);
        color: var(--text-primary);
        text-transform: none;

        &:hover {
            background-color: var(--text-secondary);
            color: var(--text-primary);
            border: 3px solid var(--text-primary);
        }
    }
`;

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    padding: 0 8px;
`;

const GameArea: React.FC = observer(() => {
    const { tappleStore } = useStores();
    const [openTimeUpModal, setOpenTimeUpModal] = useState(false);
    const [canCloseTimeUpModal, setCanCloseTimeUpModal] = useState(false);

    const handleTimeUpOpen = () => {
        setOpenTimeUpModal(true);
        setCanCloseTimeUpModal(false);
        setTimeout(() => setCanCloseTimeUpModal(true), 1000);
    };

    const handleTimeUpClose = () => {
        if (canCloseTimeUpModal) setOpenTimeUpModal(false);
    };

    useEffect(() => {
        if (tappleStore.timeOver) handleTimeUpOpen();
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
                    <FloatingLetter key={i} $delay={letter.delay} $duration={letter.duration} $top={letter.top}>
                        {letter.char}
                    </FloatingLetter>
                ))}
            </BackgroundLetters>

            {/* Time's Up Modal */}
            <Modal open={openTimeUpModal} onClose={handleTimeUpClose}>
                <Typography variant="h4" fontWeight="bold">⏰ Time's Up!</Typography>
                <Typography variant="body1" textAlign="center">
                    Pass the device to the next player.
                </Typography>
                <StyledButton onClick={handleTimeUpClose} disabled={!canCloseTimeUpModal}>
                    <Typography variant="h6">Next Player</Typography>
                </StyledButton>
            </Modal>

            <StyledHeader>
                <CategorySelect />
            </StyledHeader>

            <StyledLetterContainer $timeOver={tappleStore.timeOver}>
                {tappleStore.letters.map((letter) => (
                    <Letter key={letter.char} char={letter.char} />
                ))}
            </StyledLetterContainer>

            <StyledButton onClick={() => tappleStore.resetGame()}>
                <Typography variant="h6">Reset Game</Typography>
            </StyledButton>
        </StyledGameArea>
    );
});

export default GameArea;