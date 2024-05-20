import {FC} from "react";
import {NavLink, useNavigate} from "react-router-dom";

import {IUser} from "../../models/IUser.ts";

interface IProps {
    user: IUser
}

const User: FC<IProps> = ({user}) => {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`${user.id}/posts`)
        // navigate(`${user.id}/posts`, {state: {key: 'some data'}})
    }

    return (
        <div>
            <NavLink to={user.id.toString()} state={user}><h2>{user.id}) {user.name}</h2></NavLink>
            <button onClick={handleClick}>show posts by this user</button>
            <hr/>
        </div>
    );
};

export {User};