import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { API, ROUTER } from "../constants/env";
import { useNavigate } from "react-router-dom";

import {
    setLogin,
    logout,
    setForgotPassword,
    setResetPassword,
} from "../redux/features/auth/authSlice";
export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const auth = useAppSelector((state: any) => state.auth);
    const handleLogin = async (user: any) => {
        try {
            dispatch(setLogin({ loading: true }));
            const response = await fetch(API.auth.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setLogin({ error: null }));
                localStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));
                dispatch(setLogin({ user: data.user, token: data.token }));
                navigate(ROUTER.APPOINTMENTS);
            } else {
                alert("error");
                dispatch(setLogin({ error: data.error }));
            }
            dispatch(setLogin({ loading: false }));
        } catch (error) {
            alert("error");
            dispatch(setLogin({ error, loading: false }));
        }
    };
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(logout());
    };
    const handleForgotPassword = async (user: any) => {
        try {
            dispatch(setForgotPassword({ loading: true }));
            const response = await fetch(API.auth.forgotPassword, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setForgotPassword({ message: data.message }));
                dispatch(setForgotPassword({ error: null }));
            } else {
                dispatch(setForgotPassword({ error: data.error }));
            }
            dispatch(setForgotPassword({ loading: false }));
        } catch (error) {
            dispatch(setForgotPassword({ error, loading: false }));
        }
    };
    const handleResetPassword = async (user: any) => {
        if (user.newPassword !== user.newPasswordConfirmation) {
            dispatch(setResetPassword({ error: "passwords don't match" }));
            return;
        }
        try {
            dispatch(setResetPassword({ loading: true }));
            const response = await fetch(API.auth.resetPassword, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(setResetPassword({ error: null }));
                navigate(ROUTER.AUTH.LOGIN);
            } else {
                dispatch(setResetPassword({ error: data.error }));
            }
            dispatch(setResetPassword({ loading: false }));
        } catch (error) {
            dispatch(setResetPassword({ error, loading: false }));
        }
    };
    return {
        auth,
        user: auth.user,
        handleLogin,
        handleLogout,
        handleForgotPassword,
        handleResetPassword,
    };
};
