import SendMessageForm from './SubComponents/SendMessageForm'
import ChannelControl from './SubComponents/ChannelControl'
import Messages from './SubComponents/Messages'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import React from 'react'

/**
 * @property none
 * @returns {Chat} @type React.JSX.Element
 * @description The main chat component
 */
export default function Chat(): React.JSX.Element {
  const activeChannel = useSelector((state: RootState) => state.channelsBar)
  return (
    <div className="relative m-1 min-h-[calc(100vh-2rem)] w-[calc(100%-30rem)] rounded-2xl bg-original-white">
      <ChannelControl channelName={activeChannel.channel.name} />
      <Messages />
      <SendMessageForm />
    </div>
  )
}
