import React, {PropsWithChildren} from 'react'
import {render} from '@testing-library/react'
import type {RenderOptions} from '@testing-library/react'
import type {PreloadedState} from '@reduxjs/toolkit'
import {Provider as ReduxProvider} from 'react-redux'

import {createStore} from './model/store'
import type {AppStore, RootState} from './model/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export const renderWithProviders = (
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = createStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    const Wrapper = ({children}: PropsWithChildren<{}>): JSX.Element =>
        <ReduxProvider store={store}>{children}</ReduxProvider>

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}
