import {FC, forwardRef, InputHTMLAttributes} from "react";

import css from "./Input.module.css";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    className?: string;
}

const Input: FC<IProps> = forwardRef<HTMLInputElement, IProps>(({id, label, className = '', ...props}, ref) => {
    let styleClasses = css.Container;
    if (className) {
        styleClasses += ` ${className}`;
    }

    return (
        <div className={styleClasses}>
            <label className={css.Label} htmlFor={id}>{label}</label>
            <input ref={ref} className={css.Input} id={id} name={id} required {...props} />
        </div>
    );
});

export {Input};