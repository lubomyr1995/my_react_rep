import {Users} from "../../components/Users/Users.tsx";
import {FC} from "react";
import {Outlet} from "react-router-dom";
import css from "./UserPage.module.css";

const UsersPage:FC = () => {
    return (
        <div className={css.DividedBlock}>
            <div className={css.w35}><Users/></div>
            <Outlet/>
        </div>
    );
};

export {UsersPage};