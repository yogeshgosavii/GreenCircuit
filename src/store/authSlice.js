import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    token: null // Add token field to state
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.token = action.payload.token; // Set the token
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.token = null; // Remove the token
        }
     }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
