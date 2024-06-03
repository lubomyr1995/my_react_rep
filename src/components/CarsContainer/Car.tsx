import {FC} from "react";
import {useNavigate} from "react-router-dom";

import {ICar} from "../../interfaces/ICar.ts";
import {carsService} from "../../services/cars.service.ts";
import {useTriggerContext} from "../../hooks/useTriggerContext.ts";

interface IProps {
    car: ICar
    updateCar: (car: ICar) => void
}

const Car: FC<IProps> = ({car, updateCar}) => {
    const navigate = useNavigate();
    const {changeTrigger} = useTriggerContext();
    const handleDelete = () => {
        carsService.deleteById(car.id).then(() => {
            changeTrigger()
        }).catch(() => {
            navigate('/login')
        })
    }
    return (
        <div>
            <div>{car.id}</div>
            <div>Brand: {car.brand}</div>
            <div>Year: {car.year}</div>
            <div>Price: {car.price}</div>
            <div>
                <button onClick={handleDelete}>delete</button>
                <button onClick={() => updateCar(car)}>update</button>
            </div>
            <br/>
        </div>
    );
};

export {Car};