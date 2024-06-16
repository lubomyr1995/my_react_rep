import {IRes} from "../types";
import {ICar, IResponse} from "../models";
import {apiService} from "./api.service.ts";
import {urls} from "../constants";


const carsService = {
    getAll: (page: string = '1'): IRes<IResponse<ICar[]>> => apiService.get(urls.cars.base, {params: {page}}),
    create: (car: ICar): IRes<ICar> => apiService.post(urls.cars.base, car),
    updateById: (id: number, newCar: ICar): IRes<ICar> => apiService.put(urls.cars.getById(id), newCar),
    deleteById: (id: number): IRes<void> => apiService.delete(urls.cars.getById(id))
}
export {
    carsService
}