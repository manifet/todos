import React from 'react';
import {screen} from '@testing-library/react';

import {renderWithProviders} from "./test-utils";

import App from './App';


test('App render', () => {
    renderWithProviders(<App/>, {})

    const headingElement = screen.getByText("Todos App");

    expect(headingElement).toBeInTheDocument();
});

