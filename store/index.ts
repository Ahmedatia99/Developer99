import { configureStore } from '@reduxjs/toolkit'
import { reHydrateStore } from './config'
import userReducer from './user/user.slice'


export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: reHydrateStore([]),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch