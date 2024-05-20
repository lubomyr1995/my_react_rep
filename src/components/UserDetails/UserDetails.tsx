import {useLocation, useParams} from "react-router-dom";
import {IUser} from "../../models/IUser";
import {useEffect, useState} from "react";
import userService from "../../services/user.service";

const UserDetails = () => {
    const {userId} = useParams<{ userId: string }>();
    const location = useLocation() as { state?: IUser };
    // console.log(location.state);
    const [user, setUser] = useState<IUser | null>(location.state || null);
    const [loading, setLoading] = useState<boolean>(!location.state);
    const [error, setError] = useState<{ message: string } | null>(null);

    useEffect(() => {
        if (location.state) {
            setUser(location.state);
            setLoading(false);
        } else if (userId) {
            userService.getById(userId)
                .then(({data}) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError({message: err.message || 'Failed to fetch user data'});
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userId, location.state]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h2>{user.name} {user.username}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Phone: {user.phone}</h2>
            <h2>Address: {user.address.city}</h2>
            <h2>Website: {user.website}</h2>
        </div>
    );
};

export {UserDetails};