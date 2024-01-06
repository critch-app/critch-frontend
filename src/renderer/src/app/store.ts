import { configureStore } from '@reduxjs/toolkit'
import serverBarReducer from '@renderer/features/server/ServerBar/serverBarReducer'
import channelsBarReducer from '@renderer/features/server/ChannelsBar/channelsBarReducer'
import loginReducer from '@renderer/features/login/loginReducer'

/**
 * Creates and configures the Redux store for managing application state.
 *
 * @returns The configured Redux store.
 */
const store = configureStore({
  reducer: {
    serverBar: serverBarReducer,
    channelsBar: channelsBarReducer,
    login: loginReducer
  }
})
export type RootState = ReturnType<typeof store.getState>

export default store
