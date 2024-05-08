import {FC, useState} from 'react';

import './App.css';
import {Users} from "./components/Users/Users.tsx";
import {Posts} from "./components/Posts/Posts.tsx";


const App: FC = () => {
    // const [posts, setPosts] = useState<IPost[]>([]);
    //
    // function handleClick(userId: number) {
    //     usersService.getPostsByUserId(userId).then(({data}) => setPosts(data.posts))
    // }
    const [userId, setUserId] = useState<number|null>(null);
    function handleClick(userId: number) {
        setUserId(userId)
    }

    return (
        <div className="flex">
            <div className="w40"><Users handleClick={handleClick}/></div>
            <div className="w60">{userId ? <Posts userId={userId}/> : <span>Select Post</span>}</div>
        </div>
    );
};

export default App;
