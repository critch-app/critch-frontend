import { useContext, useEffect } from 'react'
import { useWebSocketProvider } from './useWebSocketProvider'
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query'
import { EventType } from '@renderer/env.d'
import { RootState } from '@renderer/app/store'
import { useSelector } from 'react-redux'

export function useMessaging(setMessages: React.Dispatch<any> | null): void {
  const socket = useContext(useWebSocketProvider())
  const queryClient = useQueryClient()
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  const userId = useSelector((state: RootState) => state.login.userId)
  const userToken = useSelector((state: RootState) => state.login.userToken)

  useEffect((): void | (() => void) => {
    if (userId && userToken) {
      socket?.onMessage((event: MessageEvent): void => {
        const data = JSON.parse(event.data).data
        if (activeChannelId && data.channel_id === activeChannelId && setMessages) {
          setMessages((msgs: any) => [...msgs, data])
        } else {
          window.api.showNotifications('New Message received', data.content)
          queryClient.invalidateQueries([
            'servers',
            data.server_id,
            'channels',
            data.channel_id,
            'messages'
          ] as InvalidateQueryFilters)
        }
      }, EventType.MESSAGE)
      if (activeServerId && activeChannelId) {
        return () => {
          socket?.removeEventListener(EventType.MESSAGE)
          queryClient.invalidateQueries([
            'servers',
            activeServerId,
            'channels',
            activeChannelId,
            'messages'
          ] as InvalidateQueryFilters)
        }
      } else {
        return socket?.removeEventListener(EventType.MESSAGE)
      }
    }
  }, [activeChannelId, userId, userToken])
}
