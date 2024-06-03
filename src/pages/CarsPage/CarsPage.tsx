import {useState} from "react";

import {CarForm} from "../../components/CarsContainer/CarForm.tsx";
import {Cars} from "../../components/CarsContainer/Cars.tsx";
import {ICar} from "../../interfaces/ICar.ts";

const CarsPage = () => {
    const [car, setCar] = useState<ICar>(null);
    const updateCar = (car: ICar) => {
        setCar(car)
    }
    return (
        <div>
            <h1>Cars</h1>
            <CarForm car={car} setCar={setCar}/>
            <hr/>
            <Cars updateCar={updateCar}/>
        </div>
    );
};

export {CarsPage};