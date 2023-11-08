import { configureStore } from '@reduxjs/toolkit'
import serverBarReducer from '@renderer/components/ServerBar/serverBarReducer'
import channelsBarReducer from '@renderer/features/server/ChannelsBar/channelsBarReducer'

const store = configureStore({
  reducer: {
    serverBar: serverBarReducer,
    channelsBar: channelsBarReducer
  }
})
export type RootState = ReturnType<typeof store.getState>

export default store
