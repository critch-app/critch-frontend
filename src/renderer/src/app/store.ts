import { configureStore } from '@reduxjs/toolkit'
import serverReducer from '@renderer/reducers/serverReducer'
import channelReducer from '@renderer/reducers/channelReducer'
import loginReducer from '@renderer/reducers/loginReducer'
import meetingReducer from '@renderer/reducers/meetingReducer'
import FileStackReducer from './../reducers/fileStackReducer'
const store = configureStore({
  reducer: {
    server: serverReducer,
    channel: channelReducer,
    login: loginReducer,
    meeting: meetingReducer,
    fileStack: FileStackReducer
  }
})
export type RootState = ReturnType<typeof store.getState>

export default store
