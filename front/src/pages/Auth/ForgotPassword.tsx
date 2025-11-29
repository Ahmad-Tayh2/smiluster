import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "./style.css";
export default function ForgotPassword(props: any) {
    const {} = props;
    const { auth, handleForgotPassword } = useAuth();
    const [user, setUserData] = React.useState({
        email: "",
    });
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };
    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        handleForgotPassword(user);
    };
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
                    <p>
                        Forgot your password? enter your email to help you get
                        it back
                    </p>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Entrer votre email'
                            name='email'
                            value={user.email}
                            onChange={handleOnChange}
                            readOnly={
                                auth.forgotPassword.message ? true : false
                            }
                        />
                    </div>
                    {auth.forgotPassword.message ? (
                        <div className='form-message'>
                            {auth.forgotPassword.message}
                        </div>
                    ) : (
                        <>
                            {auth.forgotPassword.error && (
                                <div className='form-error'>
                                    {auth.forgotPassword.error}
                                </div>
                            )}

                            <div>
                                <button type='submit'>Find my account</button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}
ForgotPassword.defaultProps = {};
