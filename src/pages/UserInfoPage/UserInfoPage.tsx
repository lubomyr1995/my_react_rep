import {useAppSelector} from "../../hooks";

const UserInfoPage = () => {
    const {currentUser} = useAppSelector(state => state.auth);

    return (
        <div>
            {currentUser && <>
                <h2>USER DETAILS:</h2>
                <h5>{currentUser.username}</h5>
                <h5>Created: {currentUser.created}</h5>
            </>}
        </div>
    );
};

export {UserInfoPage};