import IUser from "./IUser.ts";

interface IRespUsers {
    users: IUser[],
    total: number,
    skip: number,
    limit: number
}

export default IRespUsers;