import {ButtonHTMLAttributes, FC, PropsWithChildren} from "react";

import css from "./Button.module.css";

interface IProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    className?: string
}

const Button: FC<IProps> = ({children, className, ...props}) => {
    let styleClasses = css.Button;
    styleClasses += ' ' + className;
    return (
        <button className={styleClasses} {...props}>
            {children}
        </button>
    );
};

export {Button};