import {useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";

import css from "./MainHeader.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../store";

const MainHeader = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {currentUser} = useAppSelector(state => state.auth);

    useEffect(() => {
        if (authService.getAccessToken() && !currentUser) {
            dispatch(authActions.me())
        }
    }, [currentUser, dispatch])

    const logoutHandler = (): void => {
        authService.deleteTokens();
        dispatch(authActions.resetError())
        navigate('/login')
    }
    return (
        <header className={css.Header}>
            <div className={css.MainBlock}>
                <NavLink to={'/cars'}>CARS</NavLink>
                <NavLink to={'/spec'}>PRIVATE</NavLink>
                <NavLink to={'/about'}>ABOUT</NavLink>
            </div>
            <div className={css.LoginBlock}>
                {currentUser?.is_active ? (
                    <div className={css.User}>
                        <b onClick={() => navigate('/user-info')}>
                            {currentUser.username}
                        </b>
                        <button onClick={logoutHandler}>Log out</button>
                    </div>
                ) : (
                    <>
                        <NavLink to={'/login'}>Sign in</NavLink>
                        <NavLink to={'/register'}>Sign Up</NavLink>
                    </>
                )}
            </div>
        </header>
    );
};

export {MainHeader};