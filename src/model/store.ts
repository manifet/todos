import {todosReducer} from "./todos";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import type {PreloadedState} from "@reduxjs/toolkit";

import {todosChangeMiddleware} from "./todos";

const rootReducer = combineReducers({todos: todosReducer})


export const createStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(todosChangeMiddleware.middleware)
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore["dispatch"]