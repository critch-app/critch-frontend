import Message from './Message'
import { useRef, useEffect, useState } from 'react'
import { scrollToBottom } from '@renderer/util/helpers'
import { getChannelMessagesQuery } from '@renderer/api/query/channels'
import { ChannelType } from '@renderer/env.d'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { useMessaging } from '@renderer/hooks/useMessaging'

export default function Messages(): React.JSX.Element {
  const chatWindowRef = useRef<HTMLDivElement | null>(null)
  const activeServer = useSelector((state: RootState) => state.server.id)
  const activeChannel = useSelector((state: RootState) => state.channel.id)
  const loggedInUserId = useSelector((state: RootState) => state.login.userId)

  const query = getChannelMessagesQuery(
    activeChannel as string,
    ChannelType.SERVER,
    activeServer as string,
    0,
    50
  )

  const { ref } = useInfiniteScroll(query)
  const [apiError, setApiError] = useState('')
  const [messages, setMessages] = useState<any>([])

  useMessaging(setMessages)

  useEffect(() => {
    try {
      if (activeChannel && activeServer && query.isSuccess) {
        const newMessages: any = []
        query.data.pages.forEach((page) => {
          newMessages.push(...page.data)
        })
        // for each message get the sender data
        setMessages(newMessages)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [query.data, activeChannel, activeServer])

  useEffect(() => {
    scrollToBottom(chatWindowRef)
  }, [messages.length, messages])

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
      ref={chatWindowRef}
      className={`critch-overflow-hidden-scroll h-[calc(80vh)] w-[calc(100%)] overflow-y-scroll`}
    >
      <div ref={ref}></div>
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            sentAt={message.sent_at}
            mine={message.sender_id == loggedInUserId}
            senderId={message.sender_id}
            content={message.content}
          />
        )
      })}
    </div>
  )
}
