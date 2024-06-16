import {FC, PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import {authService} from "../../services";
import {authActions, carsActions} from "../../store";

interface IProps extends PropsWithChildren {

}

const Authed: FC<IProps> = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const accessToken = authService.getAccessToken();

    useEffect(() => {
        if (accessToken) {
            navigate("/user-info");
        } else {
            dispatch(authActions.resetError())
            dispatch(carsActions.resetError()) // цей діспатч зроблено і цей error в слайсі для того якщо токени на укр мові.
        }
    }, [accessToken])

    return (
        <>
            {children}
        </>
    );
};

export {Authed};