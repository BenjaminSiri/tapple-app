import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useStores } from '../stores/RootStore';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from '@mui/material/Typography';


const StyledCategoryDiv = styled.div`
    width: 350px;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    font-size: 20px;
    font-weight: bold;
    padding: 0 8px;
    border: 3px solid var(--text-primary);
    border-radius: 8px;
    background-color: var(--color-primary);
`;

const CategorySelect: React.FC = observer(() => {
    const { tappleStore } = useStores();

    const category = tappleStore.currentCategory;

    return (
        <StyledCategoryDiv>
            { category ? <Typography variant="h6">{category}</Typography> : <Typography variant="h6">Roll for a category</Typography> }
            <IconButton
                aria-label="reset category"
                onClick={() => tappleStore.randomizeCategory()}
                size="large"
            >
                <RefreshIcon fontSize="inherit" />
            </IconButton>
        </StyledCategoryDiv>
    );
});

export default CategorySelect;
