import { configureStore } from '@reduxjs/toolkit'
import serverReducer from '@renderer/reducers/serverReducer'
import channelReducer from '@renderer/reducers/channelReducer'
import loginReducer from '@renderer/reducers/loginReducer'

const store = configureStore({
  reducer: {
    server: serverReducer,
    channel: channelReducer,
    login: loginReducer
  }
})
export type RootState = ReturnType<typeof store.getState>

export default store
