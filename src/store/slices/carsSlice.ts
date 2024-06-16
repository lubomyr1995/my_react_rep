import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICar, IPage, IResponse} from "../../models";
import {carsService} from "../../services";


interface IState {
    carsResponse: IResponse<ICar[]>;
    trigger: boolean;
    updatedCar: ICar;
    error: boolean;
}

const initialState: IState = {
    carsResponse: {
        items: [],
        next: null,
        prev: null,
        total_items: 0,
        total_pages: 0
    },
    trigger: false,
    updatedCar: null,
    error: false
}

// Thunk for getting all cars
const getAll = createAsyncThunk<IResponse<ICar[]>, IPage>(
    'carsSlice/getAll',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await carsService.getAll(page);
            return data
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response)
        }
    }
)
// Thunk for creating car
const create = createAsyncThunk<void, { car: ICar }>(
    'carsSlice/create',
    async ({car}, {rejectWithValue}) => {
        try {
            await carsService.create(car);
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response)
        }
    }
);

// Thunk for updating selected car
const updateById = createAsyncThunk<ICar, { id: number, newCar: ICar }>(
    'carsSlice/updateById',
    async ({id, newCar}, {rejectWithValue}) => {
        try {
            const {data} = await carsService.updateById(id, newCar);
            return data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response)
        }
    }
);

// Thunk for deleting selected car
const deleteById = createAsyncThunk<void, { id: number }>(
    'carsSlice/deleteById',
    async ({id}, {rejectWithValue}) => {
        try {
            await carsService.deleteById(id)
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response)
        }
    }
)

const carsSlice = createSlice({
    name: 'carsSlice',
    initialState,
    reducers: {
        setCar: (state, action) => {
            state.updatedCar = action.payload
        },
        resetError: (state) => {
            state.error = false;
        }
    },
    extraReducers: builder =>
        builder
            // getAll slice
            .addCase(getAll.fulfilled, (state, action) => {
                state.carsResponse = action.payload
            })
            .addCase(updateById.fulfilled, state => {
                state.updatedCar = null;
            })
            // .addCase(getAll.rejected, (state, action) => {
            //     const payload = action.payload as { status: number };
            //     if (payload.status === 401) {
            //         state.error = "Your session expired"
            //     } else {
            //         state.error = "Error with server"
            //     }
            // })
            // // created slice
            // .addCase(create.fulfilled, state => {
            //     state.trigger = !state.trigger
            // })
            // // updated car slice
            // .addCase(updateById.fulfilled, state => {
            //     state.trigger = !state.trigger
            // })
            // // deleted car slice
            // .addCase(deleteById.fulfilled, state => {
            //     state.trigger = !state.trigger
            // })
            .addMatcher(isFulfilled(create, updateById, deleteById), state => {
                state.trigger = !state.trigger;
            })
            .addMatcher(isRejected(getAll, create, updateById, deleteById), (state) => {
                state.error = true;
            })
});

const {reducer: carsReducer, actions} = carsSlice;

const carsActions = {
    ...actions,
    getAll,
    create,
    updateById,
    deleteById
}

export {
    carsReducer,
    carsActions
}