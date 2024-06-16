import {FC} from "react";
import {useSearchParams} from "react-router-dom";

import {IPage} from "../../models";
import css from "./Paginator.module.css";


interface IProps {
    prev: IPage | null;
    next: IPage | null;
}

const Paginator: FC<IProps> = ({prev, next}) => {
    const [, setQuery] = useSearchParams({page: '1'});

    const handlePrev = () => {
        setQuery(prev => {
            const newPage = (+prev.get('page')! - 1).toString();
            return new URLSearchParams({page: newPage});
        });
    };

    const handleNext = () => {
        setQuery(prev => {
            const newPage = (+prev.get('page')! + 1).toString();
            return new URLSearchParams({page: newPage});
        });
    };
    return (
        <div className={css.paginatorContainer}>
            <button className={css.paginatorButton} disabled={!prev} onClick={handlePrev}>
                Previous
            </button>
            <button className={css.paginatorButton} disabled={!next} onClick={handleNext}>
                Next
            </button>
        </div>
    );
};

export {Paginator};