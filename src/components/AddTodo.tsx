import React, {useState} from "react";
import type {ChangeEvent} from "react";

import {useAppDispatch} from "../model/hooks"
import {todosSlice} from "../model/todos";

const AddTodo = () => {
    const [inputValue, setInputValue] = useState<string>('')

    const {addTodo} = todosSlice.actions
    const dispatch = useAppDispatch()


    const submitClick = () => {
        dispatch(addTodo({title: inputValue}))
        setInputValue('')
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    return (
        <div className="flex mb-8">
            <input
                className="bg-transparent outline-none font-sans font-medium p-1 text-base border-b-2 border-b-amber-500 w-full mr-8  text-white"
                value={inputValue}
                onChange={handleChange}
                type="text" placeholder="Enter todo"/>
            <button
                className="bg-amber-500 rounded font-sans text-base px-5 py-2 whitespace-nowrap font-medium text-white"
                type="button"
                onClick={submitClick}
            >
                Add Todo
            </button>
        </div>
    )
}
export default AddTodo