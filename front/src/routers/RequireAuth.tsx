import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTER } from "../constants/env";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const { auth } = useAuth();

    React.useEffect(() => {
        // TOKEN VERIFICAION NEEDED
    }, [location.pathname]);

    if (!auth.user) {
        return <Navigate to={ROUTER.AUTH.LOGIN} />;
    }

    return children;
}

interface RequireAuthProps {
    children: JSX.Element;
}
