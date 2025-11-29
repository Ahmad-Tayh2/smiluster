/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "./style.css";
import SVGIcon from "../../components/SVGIcon";
import logo from "./logo.png";
export default function Login() {
    const { auth, handleLogin } = useAuth();
    const [user, setUserData] = React.useState({
        email: "",
        password: "",
    });
    const [showPass, setShowPass] = React.useState(false);
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };
    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        handleLogin(user);
    };
    return (
        <div className='auth-page-container center'>
            <div className='login-page-container'>
                <div className='auth-box center'>
                    <img
                        src={logo}
                        alt='SM'
                        style={{
                            width: "100%",
                            marginTop: "20px",
                        }}
                    />
                    {/* <div className='logo'>
                    <img
                            src={logo}
                            alt='SM'
                            style={{
                                width: "100%",
                                marginTop: "20px",
                            }}
                        />
                    </div> */}

                    <p
                        style={{
                            color: "white",
                            fontSize: "large",
                            // fontWeight: "bold",
                            lineHeight: "1.5",
                        }}
                    >
                        Gérez votre cabinet dentaire efficacement sur Smiluster.
                    </p>
                </div>
                <form onSubmit={handleOnSubmit}>
                    {/* <h3>Bienvenue </h3> */}
                    <p>connectez-vous pour continuer</p>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Entrer votre email'
                            name='email'
                            value={user.email}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div
                        style={{
                            position: "relative",
                        }}
                    >
                        <label htmlFor='password'>Mot de passe</label>
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder='Entrer votre mot de passe'
                            name='password'
                            value={user.password}
                            onChange={handleOnChange}
                        />
                        {user.password !== "" && (
                            <div
                                style={{
                                    // backgroundColor: "red",
                                    width: "fit-content",
                                    borderRadius: "50%",
                                    padding: "0",
                                    position: "absolute",
                                    bottom: "12px",
                                    right: "8px",
                                }}
                                onClick={() => setShowPass((prev) => !prev)}
                            >
                                {!showPass ? (
                                    <SVGIcon
                                        type='hide'
                                        height={25}
                                        width={25}
                                        color='var(--color-1)'
                                    />
                                ) : (
                                    <SVGIcon
                                        type='show'
                                        height={25}
                                        width={25}
                                        color='var(--color-1)'
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    {auth.login.message && (
                        <div className='form-error'>{auth.login.message}</div>
                    )}
                    {auth.login.error && (
                        <div className='form-error'>{auth.login.error}</div>
                    )}

                    <div>
                        <button type='submit'>Se connecter</button>
                        {/* <span className='psw'>
                            <a href={ROUTER.AUTH.FORGET_PASS}>
                                Mot de passe oublié?
                            </a>
                        </span> */}
                    </div>
                </form>
            </div>
        </div>
    );
}
Login.defaultProps = {};
