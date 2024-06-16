import {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

import {ICar} from "../../models";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {carsActions} from "../../store";
import {joiResolver} from "@hookform/resolvers/joi";
import {carValidator} from "../../validators";
import css from "./CarForm.module.css";


const CarForm = () => {
    const dispatch = useAppDispatch();
    const {updatedCar} = useAppSelector(state => state.cars);
    const {register, handleSubmit, reset, setValue, formState: {errors, isValid}} = useForm<ICar>({
        mode: "onBlur",
        resolver: joiResolver(carValidator)
    });

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
        await dispatch(carsActions.create({car}));
        reset()
    }
    const handleUpdate: SubmitHandler<ICar> = async (newCar) => {
        await dispatch(carsActions.updateById({id: updatedCar.id, newCar}));
        reset()
    }
    return (
        <form className={css.formContainer} onSubmit={handleSubmit(updatedCar ? handleUpdate : handleCreate)}>
            <input type="text" placeholder="brand" {...register("brand")} className={css.inputField}/>
            {errors.brand && <p className={css.errorMessage}>{errors.brand.message}</p>}
            <input type="text" placeholder="year" {...register("year")} className={css.inputField}/>
            {errors.year && <p className={css.errorMessage}>{errors.year.message}</p>}
            <input type="text" placeholder="price" {...register("price")} className={css.inputField}/>
            {errors.price && <p className={css.errorMessage}>{errors.price.message}</p>}
            <button type="submit" className={css.submitButton} disabled={!isValid}>
                {updatedCar ? "update" : "create"}
            </button>
        </form>
    );
};

export {CarForm};