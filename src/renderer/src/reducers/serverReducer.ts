import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = { id: null } as { id: string | null }

export const setActiveServerId = createAction<any>('setActiveServer')

const ServerReducer = createReducer(initialState, (builder) => {
  builder.addCase(setActiveServerId, (state, action) => {
    state.id = action.payload
  })
})

export default ServerReducer
