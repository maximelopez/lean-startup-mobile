
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        id: '',
        name: '',
        email: '',
        score: 0,
    },
    loggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Connecter l'utilisateur
        login: (state, action) => {
            state.user = { ...action.payload };
            state.loggedIn = true;
        },

        // Déconnecter l'utilisateur
        logout: (state) => {
            state.user = { id: '', name: '', email: '', score: 0 };
            state.loggedIn = false;
        },

        setScore: (state, action) => {
           state.user.score = action.payload;
        },
    }
});

export const { login, logout, setScore } = userSlice.actions;
export default userSlice.reducer;