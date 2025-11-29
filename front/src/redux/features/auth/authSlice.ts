import { createSlice } from "@reduxjs/toolkit";
const userStateString = sessionStorage.getItem("user");
const initialState: any = {
    token: localStorage.getItem("token") || null,
    user: userStateString ? JSON.parse(userStateString) : null,
    login: {
        loading: false,
        error: null,
        message: null,
    },
    forgotPassword: {
        loading: false,
        error: null,
        message: null,
    },
    resetPassword: {
        loading: false,
        error: null,
        message: null,
    },
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const { user, token, loading, error, message } = action.payload;
            if (user !== undefined) {
                state.user = user;
            }
            if (token !== undefined) {
                state.token = token;
            }
            if (loading !== undefined) {
                state.login.loading = loading;
            }
            if (error !== undefined) {
                state.login.error = error;
            }
            if (message !== undefined) {
                state.login.message = message;
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setForgotPassword: (state, action) => {
            const { loading, error, message } = action.payload;
            if (loading !== undefined) {
                state.forgotPassword.loading = loading;
            }
            if (error !== undefined) {
                state.forgotPassword.error = error;
            }
            if (message !== undefined) {
                state.forgotPassword.message = message;
            }
        },
        setResetPassword: (state, action) => {
            const { loading, error, message } = action.payload;
            if (loading !== undefined) {
                state.resetPassword.loading = loading;
            }
            if (error !== undefined) {
                state.resetPassword.error = error;
            }
            if (message !== undefined) {
                state.resetPassword.message = message;
            }
        },
    },
});

export const { setLogin, logout, setForgotPassword, setResetPassword } =
    authSlice.actions;

export default authSlice.reducer;
