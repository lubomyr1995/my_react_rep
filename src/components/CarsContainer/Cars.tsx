import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {carsActions} from "../../store";
import {Car} from "./Car.tsx";
import {Paginator} from "../Paginator/Paginator.tsx";
import {authService} from "../../services";
import css from "./Cars.module.css";


const Cars = () => {
    const {trigger, carsResponse: {items: cars, next, prev, total_items}} = useAppSelector(state => state.cars);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page: '1'});

    useEffect(() => {
        if (authService.getAccessToken()) {
            dispatch(carsActions.getAll({page: query.get('page')}))
        }
    }, [dispatch, query, trigger])
    return (
        <>
            {cars.length > 0 ?
                <div className={css.carsContainer}>
                    {cars.length > 0 && cars.map(car => (
                        <div key={car.id} className={css.carItem}>
                            <Car car={car}/>
                        </div>
                    ))}
                    <div className={css.paginatorContainer}>
                        {total_items > 10 && <Paginator prev={prev} next={next}/>}
                    </div>
                </div>
                :
                <b className={css.allowedCars}>Not allowed cars yet!</b>
            }
        </>
    );
};

export {Cars};