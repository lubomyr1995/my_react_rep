import React, {FC, useEffect, useState} from "react";
import IUser from "../../models/IUser.ts";
import {usersService} from "../../services/users.service.ts";
import {User} from "../User/User.tsx";

type IPropsType = { children?: React.ReactNode } & { handleClick: (userId: number) => void }
const Users: FC<IPropsType> = ({handleClick}) => {
    const [users, setUsers] = useState<IUser[]>([]);
    useEffect(() => {
        usersService.getAll().then(({data: {users}}) => {
            setUsers(users)
        })
    }, []);
    return (
        <div>
            {users.length > 0 && users.map(user => <User key={user.id} user={user} handleClick={handleClick}/>)}
        </div>
    );
};

export {Users};