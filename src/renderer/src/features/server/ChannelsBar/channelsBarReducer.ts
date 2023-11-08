/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createReducer } from '@reduxjs/toolkit'
// initial state
const initialState = { channel: { server_id: '', channel_id: '', name: '' } } as any

// Create Actions
export const setActiveChannel = createAction<any>('setActiveChannel')

// Reducer
const channelsBarReducer = createReducer(initialState, (builder) => {
  builder.addCase(setActiveChannel, (state, action) => {
    state.channel = action.payload
  })
})

export default channelsBarReducer
