import React, {useCallback} from "react";
import {TransitionGroup, CSSTransition} from "react-transition-group";

import {useAppSelector} from "../model/hooks";

import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

const Todos = () => {
    const todos = useAppSelector(state => state.todos)

    const filterTodos = useCallback((completed: boolean) =>
            <TransitionGroup component={null}>
                {
                    todos.map(item => completed === item.completed ?
                        <CSSTransition classNames="todo" timeout={300} key={item.id}>
                            <TodoItem todoItem={item}/>
                        </CSSTransition> :
                        null
                    )
                }
            </TransitionGroup>

        // I need to track changes only on the todos array
        // So I ignore the eslint warning
        // eslint-disable-next-line
        , [todos])

    return (
        <div className="bg-zinc-800 py-24 px-36 rounded-3xl flex flex-col justify-start h-full">
            <h1 className="font-sans text-6xl font-bold text-center mb-16 text-amber-500">Todos App</h1>
            <AddTodo/>
            <div className="flex">
                <div data-testid="uncompleted-todos" className="pr-12 w-96 border-r-amber-500 border-r-2">
                    <h3 className="font-sans font-bold text-xl mb-4 text-white mb-4 text-center">
                        Uncompleted todos
                    </h3>
                    <ul>
                        {filterTodos(false)}
                    </ul>
                </div>
                <div data-testid="completed-todos" className="pl-12 w-96">
                    <h3 className="font-sans font-bold text-xl mb-4 text-white text-center">
                        Completed todos
                    </h3>
                    <ul>
                        {filterTodos(true)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Todos
