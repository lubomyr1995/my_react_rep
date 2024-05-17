import {Outlet} from "react-router-dom";
import {FC} from "react";

import {Header} from "../../components/Header/Header.tsx";
import css from "./MainLayout.module.css";

const MainLayout: FC = () => {
    return (
        <div className={css.OutletBox}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};