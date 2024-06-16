import {Outlet} from "react-router-dom";

import {InformWindow, Loading, MainHeader, ModalSpinner} from "../../components";


const MainLayout = () => {
    return (
        <>
            <MainHeader/>
            <ModalSpinner><Loading/></ModalSpinner>
            <InformWindow/>
            <Outlet/>
        </>
    );
};

export {MainLayout};