import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";

import css from "./Register.module.css";
import {IAuth} from "../../../models";
import {registerValidator} from "../../../validators";
import {Button, Input} from "../../UI";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {authActions} from "../../../store";


const Register = () => {
    const {errorMessage} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors: formsError, isValid}} = useForm<IAuth>({
        mode: "onBlur",
        resolver: joiResolver(registerValidator)
    });
    const handleRegister: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.register({user}));
        if (requestStatus === 'fulfilled') {
            navigate('/login')
        }
    }
    return (
        <div>
            <form className={css.RegisterForm} onSubmit={handleSubmit(handleRegister)}>
                <Input onFocus={() => dispatch(authActions.resetError())}
                       id='username' label='Username' {...register('username')}/>
                {formsError.username && <p>{formsError.username.message}</p>}

                <Input type='password' id='password' label='Password' {...register('password')}/>
                {formsError.password && <p>{formsError.password.message}</p>}

                <Input type='password' id='confirm_password' label='Password' {...register('confirm_password')}/>
                {formsError.confirm_password && <p>{formsError.confirm_password.message}</p>}

                {errorMessage && <p>{errorMessage}</p>}
                <Button disabled={!isValid}>Sign up!</Button>
            </form>
        </div>
    );
};

export {Register};