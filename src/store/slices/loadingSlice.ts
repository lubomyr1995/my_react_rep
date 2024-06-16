import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";


interface IState {
    isLoading: boolean;
}

const initialState: IState = {
    isLoading: false
}

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(isPending(), state => {
                state.isLoading = true;
            })
            .addMatcher(isFulfilled(), state => {
                state.isLoading = false;
            })
            .addMatcher(isRejected(), state => {
                state.isLoading = false;
            })
    }
});

const {reducer: loadingReducer} = loadingSlice;

export {loadingReducer};