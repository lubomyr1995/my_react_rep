import {FC, PropsWithChildren} from "react";
import {Navigate} from "react-router-dom";

import {authService} from "../services/auth.service.ts";
import {useAppLocation} from "../hooks/useAppLocation.ts";

interface IProps extends PropsWithChildren {

}

const AuthRequired: FC<IProps> = ({children}) => {
    const accessToken = authService.getAccessToken();
    const {pathname} = useAppLocation();
    if (!accessToken) {
        return <Navigate to={'/login'} state={pathname}/>
    }
    return (
        <>
            {children}
        </>
    );
};

export {AuthRequired};