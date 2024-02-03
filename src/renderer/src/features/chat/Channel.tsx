import React, { useEffect } from 'react'
import Chat from './SubComponents/Chat'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import Stream from '../stream/Stream'

export default function Channel(): React.JSX.Element {
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  const joinedChannel = useSelector((state: RootState) => state.meeting.joinedChannel)
  const pip = useSelector((state: RootState) => state.meeting.pip)

  useEffect(() => {}, [joinedChannel])

  if (joinedChannel === activeChannelId && !pip) {
    return <Stream />
  } else {
    return <Chat />
  }
}
