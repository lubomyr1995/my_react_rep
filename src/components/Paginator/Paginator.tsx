import {useSearchParams} from "react-router-dom";
import {FC} from "react";

import {IResponse} from "../../interfaces/IResponse.ts";
import {ICar} from "../../interfaces/ICar.ts";


interface IProps {
    resObj: IResponse<ICar[]>
}

const Paginator: FC<IProps> = ({resObj}) => {
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
        <div>
            <div>
                <button disabled={!resObj.prev} onClick={handlePrev}>prev</button>
                <button disabled={!resObj.next} onClick={handleNext}>next</button>
            </div>
        </div>
    );
};

export {Paginator};