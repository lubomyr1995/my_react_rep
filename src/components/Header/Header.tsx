import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import css from './Header.module.css';
import {IUser} from "../../interfaces/IUser.ts";
import {authService} from "../../services/auth.service.ts";

interface IState {
    show: boolean;
    user: IUser
}

const Header = () => {

    const initialState: IState = {
        show: false,
        user: null
    }
    const navigate = useNavigate();
    const [user, setUser] = useState<IState>(initialState);
    const accessToken = authService.getAccessToken();
    useEffect(() => {
        if (accessToken) {
            authService.me()
                .then(({data}) => setUser({show: true, user: data}))
                .catch(() => {
                    navigate('/login')
                    setUser(initialState)
                })
        } else {
            setUser(initialState)
        }
    }, [accessToken, navigate])

    const logoutHandler = () => {
        authService.deleteTokens()
        navigate('/login')
    }

    return (
        <header className={css.Header}>
            <div className={css.MainBlock}>
                <NavLink to={'/cars'}>Cars</NavLink>
                <NavLink to={'/something'}>Some Spec</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </div>
            <div className={css.LoginBlock}>
                {user.show ?
                    <>
                        <div className={css.User}>{user.user.username}</div>
                        <button onClick={logoutHandler}>Log out</button>
                    </>
                    :
                    <>
                        <NavLink to={'/login'}>Sign in</NavLink>
                        <NavLink to={'/register'}>Sign Up</NavLink>
                    </>
                }

            </div>
        </header>
    );
};

export {Header};