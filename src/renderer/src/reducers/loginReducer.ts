import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = { userId: null, userToken: null } as {
  userId: string | null
  userToken: string | null
}

export const setUserToken = createAction<any>('setUserToken')
export const setUserId = createAction<any>('setUserId')

const loginReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserId, (state, action) => {
    state.userId = action.payload
  }),
    builder.addCase(setUserToken, (state, action) => {
      state.userToken = action.payload
    })
})

export default loginReducer
