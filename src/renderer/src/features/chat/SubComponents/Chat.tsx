import ChannelControl from './ChannelControl'
import Messages from './Messages'
import SendMessageForm from './SendMessageForm'
import { getChannelByIdQuery } from '@renderer/api/query/channels'
import { ChannelType } from '@renderer/env.d'
import { useEffect, useState } from 'react'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'

export default function Chat(): React.JSX.Element {
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  const query = getChannelByIdQuery(activeChannelId as string, ChannelType.SERVER)
  const [channel, setChannel] = useState<{
    name: string
    descreption: string
    id: string
  } | null>(null)
  const [apiError, setApiError] = useState('')
  useEffect(() => {
    try {
      if (query.isSuccess) {
        setChannel(query.data.data)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [query.data, activeChannelId])

  // Handle error state
  if (query.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (query.status === 'loading') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  return (
    <div
      className={`relative m-1 min-h-[calc(100vh-2rem)] w-[calc(100%-30rem)] rounded-2xl bg-original-white`}
    >
      {channel && <ChannelControl channelName={channel.name} channelId={channel.id} />}
      <Messages />
      <SendMessageForm />
    </div>
  )
}
