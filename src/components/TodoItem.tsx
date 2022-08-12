import React, {useState, memo} from "react";
import type {ChangeEvent} from "react";

import {useAppDispatch} from "../model/hooks"
import {todosSlice} from "../model/todos";
import type {ITodoItem} from "../model/todos";

import "./TodoItem.css";

interface TodoItemProps {
    todoItem: ITodoItem,
}

const TodoItem = ({todoItem}: TodoItemProps) => {
    const [readOnly, setReadOnly] = useState<boolean>(true)
    const [todoTitle, setTodoTitle] = useState<string>(todoItem.title)

    const {deleteTodo, completeTodo, editTodo} = todosSlice.actions
    const dispatch = useAppDispatch()

    const completeClick = () => {
        dispatch(completeTodo({id: todoItem.id}))
    }
    const deleteClick = () => {
        dispatch(deleteTodo({id: todoItem.id}))
    }
    const editClick = () => {
        dispatch(editTodo({id: todoItem.id, newTitle: todoTitle}))
        setReadOnly(true)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(event.target.value)
    }

    const wantEdit = () => {
        setReadOnly(false)
    }

    return (
        <li className="mb-4 w-full border-2 px-4 py-2 border-amber-500 rounded-lg todo-enter">
            <div className="flex justify-between">
                {readOnly ?
                    <label
                        className="font-sans relative px-1 py-0.5 text-white cursor-pointer border-transparent border-2 text-base font-medium max-w-full overflow-ellipsis overflow-hidden"
                        onClick={wantEdit}>
                        {todoTitle}
                    </label> :
                    <>
                        <input
                            className="font-sans font-medium text-white bg-transparent px-1 py-0.5 outline-0 border-white border-2 rounded w-full"
                            type="text"
                            value={todoTitle}
                            onChange={handleChange}
                        />
                        <div
                            data-testid="edit-icon"
                            className="cursor-pointer w-6 h-6 flex justify-center items-center bg-amber-500 rounded ml-2 flex-none"
                            onClick={editClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 485.219 485.22">
                                <g>
                                    <path
                                        d="M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897 C491.133,84.349,491.133,122.748,467.476,146.438z M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436 c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z M60,296.54c-5.925,5.927-5.925,15.514,0,21.44 c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z M338.767,103.54L102.881,339.421 c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919 c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703 c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986 C147.097,447.637,146.36,447.193,145.734,446.572z"
                                        fill="white"/>
                                </g>
                            </svg>
                        </div>
                    </>
                }
            </div>
            <div className="flex justify-end mt-4">
                {!todoItem.completed ?
                    <div
                        className="bg-amber-500 font-sans font-medium text-white text-sm leading-none flex items-center px-2 rounded mr-2 cursor-pointer"
                        onClick={completeClick}
                    >
                        Complete
                    </div> :
                    null
                }
                <div
                    data-testid="delete-icon"
                    className="cursor-pointer w-6 h-6 flex relative bg-amber-500 rounded after:absolute after:-translate-x-1/2 after:-translate-y-1/2 after:left-1/2 after:top-1/2 after:content-[' '] after:w-4 after:h-0.5 after:bg-white after:block after:rotate-45 after:rounded before:absolute before:-translate-x-1/2 before:-translate-y-1/2 before:left-1/2 before:top-1/2 before:content-[' '] before:w-4 before:h-0.5 before:bg-white before:block before:-rotate-45 before:rounded"
                    onClick={deleteClick}>
                </div>
            </div>
        </li>
    )
}
export default memo(TodoItem)