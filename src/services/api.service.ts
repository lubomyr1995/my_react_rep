import axios from "axios";
import {baseURL} from "../constants/urls.ts";


export const apiService = axios.create({
    baseURL,
    headers: {'content-type': 'application/json; charset=UTF-8'}
});