import React, { useEffect, useMemo } from 'react'
import Chat from './SubComponents/Chat'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import Stream from '../stream/Stream'

export default function Channel(): React.JSX.Element {
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  const joinedChannel = useSelector((state: RootState) => state.meeting.joinedChannel)
  const pip = useSelector((state: RootState) => state.meeting.pip)
  const MemoizedStream = useMemo(() => {
    const streamElement = Stream
    return streamElement
  }, [])
  useEffect(() => {}, [joinedChannel])

  if (joinedChannel === activeChannelId && !pip) {
    return <MemoizedStream />
  } else {
    return <Chat />
  }
}
