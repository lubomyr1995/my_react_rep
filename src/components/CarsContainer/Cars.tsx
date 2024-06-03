import {FC, useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {carsService} from "../../services/cars.service.ts";
import {ICar} from "../../interfaces/ICar.ts";
import {Car} from "./Car.tsx";
import {useTriggerContext} from "../../hooks/useTriggerContext.ts";
import {authService} from "../../services/auth.service.ts";
import {IResponse} from "../../interfaces/IResponse.ts";
import {Paginator} from "../Paginator/Paginator.tsx";

interface IProps {
    updateCar: (car: ICar) => void
}

const Cars: FC<IProps> = ({updateCar}) => {
    const [resObj, setResObj] = useState<IResponse<ICar[]>>({
        items: [],
        next: null,
        prev: null,
        total_items: 0,
        total_pages: 0
    });
    const {trigger} = useTriggerContext();
    const navigate = useNavigate();
    const [query] = useSearchParams({page: '1'});

    useEffect(() => {
        carsService.cars(query.get('page')).then(({data}) => {
            setResObj(data);
        }).catch(() => {
            authService.deleteTokens();
            navigate('/login'); // Навігація на сторінку входу у випадку помилки
        });
    }, [query, trigger, navigate]);

    return (
        <div>
            {resObj.items.length > 0 && resObj.items.map(car => <Car key={car.id} car={car} updateCar={updateCar}/>)}
            <Paginator resObj={resObj}/>
        </div>
    );
};

export {Cars};