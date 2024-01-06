/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createReducer } from '@reduxjs/toolkit'
// initial state
const initialState = { loggedInUserToken: null, loggedInUserID: null } as any

// Create Actions
export const setLoggedInUserToken = createAction<any>('setLoggedInUserToken')
export const setLoggedInUserID = createAction<any>('setLoggedInUserID')

// Reducer
const loginReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLoggedInUserToken, (state, action) => {
    state.loggedInUserToken = action.payload
  }),
    builder.addCase(setLoggedInUserID, (state, action) => {
      state.loggedInUserID = action.payload
    })
})

export default loginReducer
