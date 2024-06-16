import {FC, PropsWithChildren} from "react";

import {useAppSelector} from "../../../hooks";
import css from "./ModalSpinner.module.css";


interface IProps extends PropsWithChildren{

}
const ModalSpinner:FC<IProps> = ({children}) => {
    const {isLoading} = useAppSelector(state => state.loading);

    const modalClass = isLoading ? `${css.show} ${css.modal}` : css.modal;

    return (
        <div className={modalClass}>
            <div>
                {children}
            </div>
        </div>
    );
};

export {ModalSpinner};