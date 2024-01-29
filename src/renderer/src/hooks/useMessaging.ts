import { useContext, useEffect } from 'react'
import { useWebSocketProvider } from './useWebSocketProvider'
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query'
import { EventType } from '@renderer/env.d'
import { RootState } from '@renderer/app/store'
import { useSelector } from 'react-redux'

export function useMessaging(setMessages: React.SetStateAction<any> | null): void {
  const socket = useContext(useWebSocketProvider())
  const queryClient = useQueryClient()
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const activeChannel = useSelector((state: RootState) => state.channelsBar.channel)

  useEffect(() => {
    socket?.onMessage((event: MessageEvent): void => {
      const data = JSON.parse(event.data)
      if (activeChannel && data.channel_id === activeChannel.id && setMessages) {
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
    return () => {
      queryClient.invalidateQueries([
        'servers',
        activeServer,
        'channels',
        activeChannel.id,
        'messages'
      ] as InvalidateQueryFilters)
    }
  }, [activeChannel?.id])
}
