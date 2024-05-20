import {NavLink} from "react-router-dom";

import css from "./Header.module.css";

const Header = () => {
    return (
        <div className={css.Header}>
            <NavLink to="home">HOME</NavLink>
            <NavLink to="users">USERS</NavLink>
            <NavLink to="posts">ALL POSTS</NavLink>
            <NavLink to="comments">ALL COMMENTS</NavLink>
        </div>
    );
};

export {Header};