import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";

import {IAuth} from "../../../interfaces/IAuth.ts";
import css from "./Login.module.css";
import {Input} from "../../UI/Input/Input.tsx";
import {Button} from "../../UI/Button/Button.tsx";
import {authService} from "../../../services/auth.service.ts";
import {useAppLocation} from "../../../hooks/useAppLocation.ts";

interface IError {
    status: boolean;
    message: string
}

interface IErrorResponse {
    detail?: string;
}

const Login = () => {
    const [error, setError] = useState<IError>({status: false, message: ''});
    const navigate = useNavigate();
    const {state} = useAppLocation<{ pathname: string }>();

    const {register, handleSubmit} = useForm<IAuth>();
    const handleAuth: SubmitHandler<IAuth> = async (user) => {
        try {
            await authService.login(user);
            navigate(state || '/cars');
        } catch (e) {
            const error = e as AxiosError<IErrorResponse>;
            const errorMessage = error.response?.data?.detail
                ? error.response.data.detail
                : 'We are sorry, but there was an unexpected error!';
            setError({
                status: true,
                message: errorMessage
            });
        }
    }
    return (
        <div className={css.FormContainer}>
            <form className={css.Login} onSubmit={handleSubmit(handleAuth)}>
                <Input onFocus={() => setError({status: false, message: ''})} id="username"
                       label="Username" {...register("username")}/>
                <Input onFocus={() => setError({status: false, message: ''})} id="password"
                       label="Password" {...register("password")}/>
                {error.status && <p>{error.message}</p>}
                <Button>Sign in</Button>
            </form>
        </div>
    );
};

export {Login};