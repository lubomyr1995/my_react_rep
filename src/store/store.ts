import {configureStore} from "@reduxjs/toolkit";

import {authReducer, carsReducer, loadingReducer} from "./slices";


const store = configureStore({
    reducer: {
        loading: loadingReducer,
        auth: authReducer,
        cars: carsReducer
    }
});

export {
    store
}
