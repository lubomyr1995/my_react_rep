import {apiService} from "./api.service.ts";
import {urls} from "../constants/urls.ts";
import {IRes} from "../types/responseType.ts";
import {IResponse} from "../interfaces/IResponse.ts";
import {ICar} from "../interfaces/ICar.ts";

const carsService = {
    cars: (page: string = '1'): IRes<IResponse<ICar[]>> => apiService.get(urls.cars.base, {params: {page}}),
    create: (data: ICar): IRes<ICar> => apiService.post(urls.cars.base, data),
    updateById: (id: number, data: ICar): IRes<ICar> => apiService.put(urls.cars.getById(id), data),
    deleteById: (id: number): IRes<void> => apiService.delete(urls.cars.getById(id))
}

export {carsService}