import React, {FC} from "react";
import IUser from "../../models/IUser.ts";

interface IProps {
    user: IUser
}

type IPropsType = IProps & { children?: React.ReactNode } & { handleClick: (userId: number) => void }
const User: FC<IPropsType> = ({user, handleClick}) => {

    return (
        <div>
            <h2>{user.id}) {user.firstName} {user.lastName}</h2>
            <button onClick={() => handleClick(user.id)}>show posts</button>
            <hr/>
        </div>
    );
};

export {User};