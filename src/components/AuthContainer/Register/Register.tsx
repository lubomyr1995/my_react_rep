import {SubmitHandler, useForm} from "react-hook-form";
import {AxiosError} from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {joiResolver} from "@hookform/resolvers/joi";

import {IAuth} from "../../../interfaces/IAuth.ts";
import {Input} from "../../UI/Input/Input.tsx";
import {Button} from "../../UI/Button/Button.tsx";
import css from "./Register.module.css"
import {registerValidator} from "../../../validators/registerValidator.ts";
import {authService} from "../../../services/auth.service.ts";

const Register = () => {
        const [error, setError] = useState({status: false, message: ''});
        const navigate = useNavigate();
        const {register, handleSubmit, formState: {errors, isValid}} = useForm<IAuth>({
            mode: "onBlur",
            resolver: joiResolver(registerValidator)
        });


        const handleRegister: SubmitHandler<IAuth> = async (user) => {
            try {
                await authService.register(user);
                navigate('/login')
            } catch (e) {
                const error = e as AxiosError
                if (error.response?.status === 400) {
                    setError({status: true, message: "Username already exists"})
                } else {
                    setError({status: true, message: "Something went wrong!"})
                }
            }
        }

        return (
            <form className={css.RegisterForm} onSubmit={handleSubmit(handleRegister)}>
                <Input id={'username'} label={'Username'} {...register('username')}/>
                {errors.username && <p>{errors.username.message}</p>}
                <Input type='password' id={'password'} label={'Password'} {...register('password')}/>
                {errors.password && <p>{errors.password.message}</p>}
                <Input type='password' id={'confirm_password'} label={'Password'} {...register('confirm_password')}/>
                {errors.confirm_password && <p>{errors.confirm_password.message}</p>}
                {error.status && <p>{error.message}</p>}
                <Button disabled={!isValid}>Sign up!</Button>
            </form>
        );
    }
;

export {Register};