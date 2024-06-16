import {FC} from "react";

import {ICar} from "../../models";
import {useAppDispatch} from "../../hooks";
import {carsActions} from "../../store";
import css from "./Cars.module.css";


interface IProps {
    car: ICar
}

const Car: FC<IProps> = ({car}) => {
    const dispatch = useAppDispatch();
    return (
        <div className={css.carItem}>
            <div className={css.carInfo}>ID: {car.id}</div>
            <div className={css.carInfo}>Brand: {car.brand}</div>
            <div className={css.carInfo}>Year: {car.year}</div>
            <div className={css.carInfo}>Price: ${car.price}</div>
            <div className={css.carButtons}>
                <button
                    className={css.carButton}
                    onClick={() => dispatch(carsActions.deleteById({id: car.id}))}
                >
                    Delete
                </button>
                <button
                    className={css.carButton}
                    onClick={() => dispatch(carsActions.setCar(car))}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export {Car};