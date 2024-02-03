import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {
  joinedServer: null,
  joinedChannel: null,
  pip: false,
  isAudio: true,
  isVideo: false
} as {
  joinedServer: string | null
  joinedChannel: string | null
  pip: boolean
  isAudio: boolean
  isVideo: boolean
}

export const joinMeeting = createAction<{ serverId: string; channelId: string }>(
  'joinMeetingInChannel'
)
export const togglePip = createAction<void>('setPip')
export const leaveMeeting = createAction<void>('leaveMeeting')
export const toggleAudio = createAction<void>('toggleAudio')
export const toggleVideo = createAction<void>('toggleVideo')

const MeetingReducer = createReducer(initialState, (builder) => {
  builder.addCase(joinMeeting, (state, action) => {
    state.joinedChannel = action.payload.channelId
    state.joinedServer = action.payload.serverId
  })

  builder.addCase(togglePip, (state) => {
    state.pip = !state.pip
  })

  builder.addCase(leaveMeeting, (state) => {
    state.pip = initialState.pip
    state.isAudio = initialState.isAudio
    state.isVideo = initialState.isVideo
    state.joinedChannel = initialState.joinedChannel
    state.joinedServer = initialState.joinedServer
  })

  builder.addCase(toggleAudio, (state) => {
    state.isAudio = !state.isAudio
  })

  builder.addCase(toggleVideo, (state) => {
    state.isVideo = !state.isVideo
  })
})

export default MeetingReducer
