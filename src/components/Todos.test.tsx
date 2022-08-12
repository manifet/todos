import React from 'react';
import {screen, within} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {config} from 'react-transition-group';

import {renderWithProviders} from "../test-utils";

import {createStore} from "../model/store";
import {todosSlice} from "../model/todos";

import Todos from './Todos';

beforeAll(() => {
    config.disabled = true
})


test('With uses preloaded state to rendering Todos', () => {
    const store = createStore();
    store.dispatch(todosSlice.actions.addTodo({title: "Testing todo"}));

    renderWithProviders(<Todos/>, {store});

    const testingTodo = screen.getByText("Testing todo");

    expect(testingTodo).toBeInTheDocument();
});

test('Adding todo', () => {
    const store = createStore();

    renderWithProviders(<Todos/>, {store});

    const input = screen.getByPlaceholderText("Enter todo")
    const addButton = screen.getByText("Add Todo");

    userEvent.paste(input, "Testing todo")
    userEvent.click(addButton)

    expect(input).toHaveTextContent("")
    expect(screen.getByText("Testing todo")).toBeInTheDocument()
});


test("Deleting todo", () => {
    const store = createStore();
    store.dispatch(todosSlice.actions.addTodo({title: "Testing todo"}));

    renderWithProviders(<Todos/>, {store});

    expect(screen.getByText("Testing todo")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("delete-icon"))

    expect(screen.queryByText("Testing todo")).toBeNull()
})

test("Editing todo", () => {
    const store = createStore();
    store.dispatch(todosSlice.actions.addTodo({title: "Testing todo"}));

    renderWithProviders(<Todos/>, {store});

    const todoLabel = screen.getByText("Testing todo")

    userEvent.click(todoLabel)

    const todoEditInput = screen.getByDisplayValue("Testing todo")

    expect(todoLabel).not.toBeInTheDocument()
    expect(todoEditInput).toBeInTheDocument()

    userEvent.clear(todoEditInput)
    userEvent.paste(todoEditInput, "Edited Todo")
    userEvent.click(screen.getByTestId("edit-icon"))

    expect(todoEditInput).not.toBeInTheDocument()
    expect(screen.getByText("Edited Todo")).toBeInTheDocument()
})

test("Completing todo", () => {
    const store = createStore();
    store.dispatch(todosSlice.actions.addTodo({title: "Testing todo"}));

    renderWithProviders(<Todos/>, {store});

    const completedList = screen.getByTestId("completed-todos")
    const uncompletedList = screen.getByTestId("uncompleted-todos")

    expect(within(uncompletedList).getByText("Testing todo")).toBeInTheDocument()

    userEvent.click(screen.getByText("Complete"))
    expect(within(uncompletedList).queryByText("Testing todo")).toBeNull()
    expect(within(completedList).getByText("Testing todo")).toBeInTheDocument()
})