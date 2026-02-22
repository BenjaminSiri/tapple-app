import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/RootStore';
import Modal from './Modal';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';

const CategoryCard = styled.div`
    width: 300px;
    height: 200px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Divider = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0;
`;

const CircleRefreshButton = styled(IconButton)`
    && {
        position: absolute;
        z-index: 10;
        width: 40px;
        height: 40px;
        background-color: var(--background);
        border: 2px solid var(--text-primary);
        color: var(--text-primary);

        &:hover {
            background-color: var(--text-primary);
            color: var(--color-primary);
        }
    }
`;

const CategoryOptionTop = styled.div<{ $active?: boolean }>`
    height: 50%;
    padding: 10px 16px;
    border-radius: 12px 12px 0 0;
    border: 2px solid var(--text-primary);
    border-bottom: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    background-color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--color-secondary)')};
    color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--text-primary)')};
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
        background-color: var(--text-primary);
        color: var(--color-primary);
    }
`;

const CategoryOptionBottom = styled.div<{ $active?: boolean }>`
    height: 50%;
    padding: 10px 16px;
    border-radius: 0 0 12px 12px;
    border: 2px solid var(--text-primary);
    border-top: 1px solid var(--text-primary);
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    background-color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--color-tertiary)')};
    color: ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--text-primary)')};
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
        background-color: var(--text-primary);
        color: var(--color-primary);
    }
`;

const DifficultyBadge = styled.span<{ $difficulty: 'easy' | 'hard' }>`
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 8px;
    background-color: ${({ $difficulty }) => $difficulty === 'easy' ? '#4caf50' : '#f44336'};
    color: white;
    margin-left: 8px;
`;

const PullTab = styled.div`
    position: fixed;
    height: 40px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 102;
    background-color: var(--color-primary);
    border: 3px solid var(--text-primary);
    border-top: none;
    border-radius: 0 0 20px 20px;
    padding: 4px 20px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
`;


const CategorySelect: React.FC = observer(() => {
    const { tappleStore } = useStores();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        tappleStore.randomizeCategory();
    }, []);

    const handleClose = () => setOpen(false);

    const handleSelectOption = (option: string) => {
        tappleStore.setCategory(option);
        handleClose();
    };

    const options = tappleStore.currentCategoryOptions;

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                tab={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                variant="pulldown"
            >
                <Typography variant="h6" fontWeight="bold">Choose a Category</Typography>
                <CategoryCard>
                    <CategoryOptionTop
                        $active={options[0]?.text === tappleStore.currentCategory}
                        onClick={() => handleSelectOption(options[0]?.text)}
                    >
                        {options[0]?.text}
                        <DifficultyBadge $difficulty="easy">easy</DifficultyBadge>
                    </CategoryOptionTop>

                    <Divider>
                        <CircleRefreshButton
                            aria-label="reselect categories"
                            onClick={() => tappleStore.randomizeCategory()}
                            size="small"
                        >
                            <RefreshIcon fontSize="small" />
                        </CircleRefreshButton>
                    </Divider>

                    <CategoryOptionBottom
                        $active={options[1]?.text === tappleStore.currentCategory}
                        onClick={() => handleSelectOption(options[1]?.text)}
                    >
                        {options[1]?.text}
                        <DifficultyBadge $difficulty="hard">hard</DifficultyBadge>
                    </CategoryOptionBottom>
                </CategoryCard>
            </Modal>

            {/* Pull tab when modal is closed */}
            {!open && (
                <PullTab
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    {tappleStore.currentCategory && (
                        <Typography variant="body1" fontWeight="bold" noWrap sx={{ maxWidth: '180px' }}>
                            {tappleStore.currentCategory}
                        </Typography>
                    )}
                    <KeyboardArrowDownIcon />
                </PullTab>
            )}
        </>
    );
});

export default CategorySelect;