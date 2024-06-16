import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAuth, IUser} from "../../models";
import {authService} from "../../services";


interface IState {
    currentUser: IUser | null;
    errorMessage: string;
}

const initialState: IState = {
    currentUser: null,
    errorMessage: ''
}

// Register Thunk
const register = createAsyncThunk<void, { user: IAuth }>(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            await authService.register(user);
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response)
        }
    }
);

// Login Thunk
const login = createAsyncThunk<IUser, { user: IAuth }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response)
        }
    }
);

// Me Thunk - info about current user
const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.me();
            return data
        } catch (e) {
            const error = e as AxiosError
            return rejectWithValue(error.response)
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        resetError: (state) => {
            state.errorMessage = '';
            state.currentUser = null;
        }
    },
    extraReducers: builder =>
        builder
            // Register case
            .addCase(register.fulfilled, state => {
                state.errorMessage = '';
            })
            .addCase(register.rejected, state => {
                state.errorMessage = 'This username already created';
            })
            // Login case
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload
                state.errorMessage = '';
            })
            .addCase(login.rejected, (state, action) => {
                state.currentUser = null;
                const status = action.payload as { status: number };
                if (status.status === 401) {
                    state.errorMessage = "Not found account with this given credentials";
                } else {
                    state.errorMessage = "Something went wrong with server";
                }
            })
            // Me case
            .addCase(me.fulfilled, (state, action) => {
                state.currentUser = action.payload
            })
});

const {reducer: authReducer, actions} = authSlice;

const authActions = {...actions, register, login, me};

export {
    authReducer,
    authActions
}
