import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import "./style.css";
export default function ResetPassword(props: any) {
    const {} = props;
    const { auth, handleResetPassword } = useAuth();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const [user, setUserData] = React.useState({
        token: "",
        newPassword: "",
        newPasswordConfirmation: "",
    });
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };
    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        handleResetPassword(user);
    };
    React.useEffect(() => {
        if (token) {
            setUserData((prev) => ({ ...prev, token }));
        }
    }, [token]);
    return (
        <div className='auth-page-container center'>
            <div className='login-page-container'>
                <div className='auth-box center'>
                    <div className='logo'>Smiluster</div>
                    <p>
                        Connect with friends and the world around you on
                        Smiluster.
                    </p>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <p>Please reset your password to login with next time</p>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={email || ""}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor='pwd'>Mot de passe</label>
                        <input
                            type='password'
                            placeholder='Entrer votre mot de passe'
                            name='newPassword'
                            value={user.newPassword}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='pwd'>Confirmation mot de passe</label>
                        <input
                            type='password'
                            placeholder='Confirmer votre mot de passe'
                            name='newPasswordConfirmation'
                            value={user.newPasswordConfirmation}
                            onChange={handleOnChange}
                        />
                    </div>
                    {auth.resetPassword.error && (
                        <div className='form-error'>
                            {auth.resetPassword.error}
                        </div>
                    )}
                    <div>
                        <button type='submit'>Valider</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
ResetPassword.defaultProps = {};
