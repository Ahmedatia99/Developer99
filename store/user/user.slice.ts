import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfo {
    id?: number | null;
    email?: string | null;
    first_name?: string | null;
    last_name?: string | null;
}

export interface UserState {
    isLogged: boolean;
    info: UserInfo
}

const initialState: UserState = {
    isLogged: false,
    info: {
        id: null,
        email: null,
        first_name: null,
        last_name: null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: UserState) => {
            state.isLogged = true
        },
        logout: (state: UserState) => {
            state.isLogged = false
            state.info = initialState.info
        },
        updateInfo: (state: UserState, action: PayloadAction<UserInfo>) => {
            state.info = { ...state.info, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, updateInfo } = userSlice.actions

// Selectors
export const selectUser = (state: { user: UserState }) => state.user
export const selectUserInfo = (state: { user: UserState }) => state.user.info
export const selectLogged = (state: { user: UserState }) => state.user.isLogged
export const selectEmail = (state: { user: UserState }) => state.user.info.email

export default userSlice.reducer