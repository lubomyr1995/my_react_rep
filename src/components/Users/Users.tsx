import {FC, useEffect, useState} from "react";

import {IUser} from "../../models/IUser.ts";
import userService from "../../services/user.service.ts";
import {User} from "../User/User.tsx";

const Users: FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        userService.getAll().then(({data: users}) => setUsers(users))
    }, [])
    return (
        <div>
            {users.length > 0 && users.map(user => <User key={user.id} user={user}/>)}
        </div>
    );
};

export {Users};