import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        setExperience: (state, action) => action.payload,
        clearExperience: () => initialState,
    },
});

export const { setExperience, clearExperience } = experienceSlice.actions;
export default experienceSlice.reducer;