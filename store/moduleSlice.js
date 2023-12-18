import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modules: [],
    module: undefined,
    searchText: '',
};

export const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        setModules: (state, { payload }) => {
            console.log('setModules');
            state.modules = payload;
        },
        setModule: (state, { payload }) => {
            console.log('setModule', payload);
            state.module = payload;
        },
        setSearch: (state, { payload }) => {
            state.searchText = payload
        },
        resetModule: (state) => {
            console.log('resetModule');
            state.module = undefined;
        },
    },
});

export const moduleReducer = moduleSlice.reducer;

export const { setModules, setModule, setSearch, resetModule } = moduleSlice.actions;