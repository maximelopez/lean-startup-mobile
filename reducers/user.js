
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 name: '',
 email: '',
 score: 0,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Connecter l'utilisateur
        login: (state, action) => {
            const { name, email, score } = action.payload;
            state.name = name;
            state.email = email;
            state.score = score;
        },

        // Déconnecter l'utilisateur
            logout: (state) => {
            state.name = '';
            state.email = '';
            state.score = 0;
        },

        // Mettre à jour uniquement le score
        setScore: (state, action) => {
            state.score = action.payload; // action.payload = nouveau score
        },
    }
});

export const { login, logout, setScore } = userSlice.actions;
export default userSlice.reducer;