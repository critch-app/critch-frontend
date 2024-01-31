import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = { id: null } as { id: string | null }

export const setActiveChannelId = createAction<any>('setActiveChannel')

const channelReducer = createReducer(initialState, (builder) => {
  builder.addCase(setActiveChannelId, (state, action) => {
    state.id = action.payload
  })
})

export default channelReducer
