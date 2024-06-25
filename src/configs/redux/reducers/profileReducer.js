import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => action.payload,
        clearProfile: () => initialState,
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;