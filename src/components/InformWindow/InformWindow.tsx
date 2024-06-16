import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Modal} from "../UI/Modal/Modal.tsx";


const InformWindow = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query] = useSearchParams();
    const sessionExpired: string | null = query.get('SessionExpired');

    useEffect(() => {
        if (sessionExpired) {
            setIsOpen(true)
        }
    }, [sessionExpired])

    const handelClose = (): void => {
        setIsOpen(false);
        navigate('/login');
    }

    return (
        <Modal open={isOpen} close={handelClose}>
            <h5>This session was expired</h5>
            <button onClick={handelClose}>ok</button>
        </Modal>
    );
};

export {InformWindow};