import { useSelector } from 'react-redux'
import ChannelControl from './ChannelControl'
import Messages from './Messages'
import SendMessageForm from './SendMessageForm'
import { RootState } from '@renderer/app/store'

/**
 * Channel chat view component
 * @returns {React.JSX.Element} renderer component.
 */
export default function Chat(): React.JSX.Element {
  const activeChannel = useSelector((state: RootState) => state.channelsBar)
  return (
    <div
      className={`relative m-1 min-h-[calc(100vh-2rem)] w-[calc(100%-30rem)] rounded-2xl bg-original-white`}
    >
      <ChannelControl channelName={activeChannel.channel.name} />
      <Messages />
      <SendMessageForm />
    </div>
  )
}
