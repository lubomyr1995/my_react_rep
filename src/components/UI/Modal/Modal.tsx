import {FC, PropsWithChildren, useEffect, useRef} from "react";
import {createPortal} from "react-dom";

import css from "./Modal.module.css";


interface IProps extends PropsWithChildren {
    open: boolean;
    close: () => void;
}

const Modal: FC<IProps> = ({children, open, close}) => {
    const dialog = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal()
        }
        return () => modal.close()
    }, [open])

    return createPortal(
        <dialog className={css.modal} ref={dialog} onClose={close}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
};

export {Modal};