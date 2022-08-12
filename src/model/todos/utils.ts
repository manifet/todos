export interface ITodoItem {
    id: string,
    title: string,
    completed: boolean
}

export enum Actions {
    AddTodo = "addTodo",
    DeleteTodo = "deleteTodo",
    CompleteTodo = "completeTodo",
    EditTodo = "editTodo"
}

export interface Payloads {
    [Actions.AddTodo]: {
        title: ITodoItem["title"]
    },
    [Actions.DeleteTodo]: {
        id: ITodoItem["id"]
    },
    [Actions.CompleteTodo]: {
        id: ITodoItem["id"]
    },
    [Actions.EditTodo]: {
        id: ITodoItem["id"]
        newTitle: ITodoItem["title"]
    }
}