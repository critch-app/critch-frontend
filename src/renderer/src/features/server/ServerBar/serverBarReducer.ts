/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createReducer } from '@reduxjs/toolkit'
// initial state
const initialState = { activeServerID: null } as any

// Create Actions
export const setActiveServer = createAction<any>('setActiveServer')

// Reducer
const ServerBarReducer = createReducer(initialState, (builder) => {
  builder.addCase(setActiveServer, (state, action) => {
    state.activeServerID = action.payload
  })
})

export default ServerBarReducer
