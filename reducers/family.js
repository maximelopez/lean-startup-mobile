import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    members: [],
};

export const familySlice = createSlice({
    name:'family',
    initialState,
    reducers: {
        // Remplacer la liste complète de membres
        setMembers: (state, action) => {
        state.members = action.payload;
        },

        // Ajouter un membre
        addMember: (state, action) => {
        if (!state.members.includes(action.payload)) {
            state.members.push(action.payload);
        }
        },

        // Supprimer un membre
        removeMember: (state, action) => {
        state.members = state.members.filter(id => id !== action.payload);
        },

        // Vider la liste des membres
        clearMembers: (state) => {
        state.members = [];
        },
    },
});

export const { setMembers, addMember, removeMember, clearMembers } = familySlice.actions;
export default familySlice.reducer;