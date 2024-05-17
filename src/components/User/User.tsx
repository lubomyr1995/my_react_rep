import {FC} from "react";
import {IUser} from "../../models/IUser.ts";

interface IProps{
    user: IUser
}
const User:FC<IProps> = ({user}) => {
    return (
        <div>
            <h2>{user.id}) {user.name}</h2>
            <br/>
        </div>
    );
};

export {User};