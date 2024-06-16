import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import css from "./Login.module.css";
import {IAuth} from "../../../models";
import {Button, Input} from "../../UI";
import {useAppDispatch, useAppLocation, useAppSelector} from "../../../hooks";
import {authActions} from "../../../store";


const Login = () => {
    const navigate = useNavigate();
    const {state} = useAppLocation();
    const {errorMessage} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm<IAuth>();

    const handleAuth: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === "fulfilled") {
            navigate(state || '/cars')
        }
    }

    return (
        <div className={css.FormContainer}>
            <form className={css.Login} onSubmit={handleSubmit(handleAuth)}>
                <Input onFocus={() => dispatch(authActions.resetError())} id="username"
                       label="Username" {...register("username")}/>
                <Input onFocus={() => dispatch(authActions.resetError())} type="password" id="password"
                       label="Password" {...register("password")}/>
                {errorMessage && <p>{errorMessage}</p>}
                <Button>Sign in</Button>
            </form>
        </div>
    );
};

export {Login};