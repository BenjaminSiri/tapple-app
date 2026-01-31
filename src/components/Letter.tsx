import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/RootStore';
import styled from 'styled-components';

interface LetterProps {
    char: string;
}

const StyledDiv = styled.div<{ $enabled: boolean }>`
    border: 3px solid var(--text-primary);
    border-radius: 12px;
    background-color: var(--color-primary);
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;

    ${({ $enabled }) =>
        !$enabled &&
        `
        background-color: var(--text-secondary);
        color: var(--text-primary);
    `}
`;

const Letter: React.FC<LetterProps> = observer(({ char }) => {
    const { tappleStore } = useStores();

    const status = tappleStore.getLetterStatus(char);

    const handleClick = () => {
        tappleStore.disableLetter(char);
    };

    return (
        <StyledDiv $enabled={status} onClick={handleClick}>
            {char}
        </StyledDiv>
    );
});

export default Letter;