import {SubmitHandler, useForm} from "react-hook-form";
import {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ICar} from "../../interfaces/ICar.ts";
import {carsService} from "../../services/cars.service.ts";
import {useTriggerContext} from "../../hooks/useTriggerContext.ts";

interface IProps {
    car: ICar | null
    setCar: (car: ICar | null) => void;
}

const CarForm: FC<IProps> = ({car: updatedCar, setCar}) => {
    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);
    const {changeTrigger} = useTriggerContext();
    const {register, handleSubmit, setValue, reset} = useForm<ICar>();

    useEffect(() => {
        if (updatedCar) {
            setValue('brand', updatedCar.brand);
            setValue('year', updatedCar.year);
            setValue('price', updatedCar.price);
        } else {
            reset();
        }
    }, [updatedCar, setValue, reset]);
    const handleCreate: SubmitHandler<ICar> = async (car) => {
        try {
            await carsService.create(car);
            changeTrigger()
            reset()
        } catch (_) {
            setError(true)
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
    }
    const handleUpdate: SubmitHandler<ICar> = async (newCar: ICar) => {
        if (updatedCar) {
            try {
                await carsService.updateById(updatedCar.id, newCar);
                changeTrigger();
                reset();
                setCar(null)
            } catch (_) {
                setError(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        }
    };
    return (
        <form onSubmit={handleSubmit(updatedCar ? handleUpdate : handleCreate)}>
            <input type="text" placeholder='brand' {...register('brand')}/>
            <input type="text" placeholder='year' {...register('year')}/>
            <input type="text" placeholder='price' {...register('price')}/>
            {error && <p>Something go wrong with the server or your session expired</p>}
            <button>{updatedCar ? 'update' : 'create'}</button>
        </form>
    );
};

export {CarForm};