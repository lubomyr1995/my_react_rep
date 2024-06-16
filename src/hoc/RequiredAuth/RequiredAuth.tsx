import {useNavigate} from "react-router-dom";
import {FC, PropsWithChildren, useEffect} from "react";

import {authService} from "../../services";
import {useAppLocation, useAppSelector} from "../../hooks";


interface IProps extends PropsWithChildren {

}

const RequiredAuth: FC<IProps> = ({children}) => {
    const {error} = useAppSelector(state => state.cars);
    const {pathname} = useAppLocation();
    const navigate = useNavigate();
    const accessToken = authService.getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            navigate('/login', {state: pathname})
        }
    }, [accessToken])

    useEffect(() => {
        if (error) {
            navigate('/login');
            authService.deleteTokens();
        }
    }, [error])

    return (
        <>
            {children}
        </>
    );
};

export {RequiredAuth};