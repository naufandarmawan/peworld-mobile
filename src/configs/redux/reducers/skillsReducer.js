import { createSlice } from '@reduxjs/toolkit';

const initialState = []

const skillsSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        setSkills: (state, action) => action.payload,
        clearSkills: () => initialState,
    },
});

export const { setSkills, clearSkills } = skillsSlice.actions;
export default skillsSlice.reducer;