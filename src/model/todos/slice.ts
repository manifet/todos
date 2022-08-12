import {v4 as uuid} from "uuid";
import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

import {Actions} from "./utils";
import type {Payloads,ITodoItem} from "./utils";

const initialState: ITodoItem[] = (function () {
    const localTodos = localStorage.getItem("todos")
    let initialTodos: ITodoItem[] = []

    if (localTodos) {
        initialTodos = JSON.parse(localTodos)
    } else {
        localStorage.setItem("todos", JSON.stringify(initialTodos))
    }

    return initialTodos
})()

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        [Actions.AddTodo]: (state, {payload}: PayloadAction<Payloads[Actions.AddTodo]>) => {
            state.push({
                completed: false,
                title: payload.title,
                id: uuid()
            })
        },
        [Actions.DeleteTodo]: (state, {payload}: PayloadAction<Payloads[Actions.DeleteTodo]>) => state.filter(item => !(item.id === payload.id)),
        [Actions.CompleteTodo]: (state, {payload}: PayloadAction<Payloads[Actions.CompleteTodo]>) => {
            const todoItem = state.find(item => item.id === payload.id)
            if (todoItem){
                todoItem.completed = true
            }
        },
        [Actions.EditTodo]: (state, {payload}: PayloadAction<Payloads[Actions.EditTodo]>) => {
            const todoItem = state.find(item => item.id === payload.id)
            if (todoItem){
                todoItem.title = payload.newTitle
            }
        }
    }
})

export const todosReducer = todosSlice.reducer
