import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolio: (state, action) => action.payload,
        clearPortfolio: () => initialState,
    },
});

export const { setPortfolio, clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;