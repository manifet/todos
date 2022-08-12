import {createListenerMiddleware, isAnyOf, TypedStartListening} from "@reduxjs/toolkit";

import {todosSlice} from "./slice";
import {AppDispatch, RootState} from "../store";

export const todosChangeMiddleware = createListenerMiddleware()

const {addTodo, deleteTodo, completeTodo, editTodo} = todosSlice.actions

type AppStartListening = TypedStartListening<RootState, AppDispatch>
const startTodosListening = todosChangeMiddleware.startListening as AppStartListening
startTodosListening({
    matcher: isAnyOf(addTodo, deleteTodo, completeTodo, editTodo),
    effect: (action,listenerAPI)=>{
        localStorage.setItem("todos", JSON.stringify(listenerAPI.getState().todos))
    }
})