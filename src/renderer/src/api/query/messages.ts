/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageFormValues, MessageType } from '@renderer/env'
import * as messageAxios from '../axios/messages'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

/**
 * Fetches a specific message by its ID.
 * @param messageId - The ID of the message to retrieve.
 * @returns A query object for accessing and managing the fetched data.
 */
export function getMessageByIdQuery(
  messageId: string,
  channelId: string,
  serverId: string | null = null
): any {
  let qk: string[]
  if (serverId) {
    qk = ['servers', serverId, 'channels', channelId, 'messages', messageId]
  } else {
    qk = ['dm', 'channels', channelId, 'messages', messageId]
  }
  const query = useQuery({
    queryKey: qk,
    queryFn: async () => {
      const response = await messageAxios.getMessage(messageId)
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000 + 5
  })
  return query
}

/**
 * Fetches a specific channel by its ID.
 * @param channelId - The ID of the channel to retrieve.
 * @returns A query object with methods for accessing and managing the fetched data.
 */
export function updateMessageMut(
  callback: () => void,
  messageType: MessageType,
  channelId: string,
  serverId: string | null = null
): any {
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async ({ messageId, body }: { messageId: string; body: MessageFormValues }) => {
      const response = await messageAxios.updateMessage(
        messageId,
        body,
        messageType === MessageType.SERVER
      )
      return response
    },
    onSuccess: () => {
      if (messageType === MessageType.SERVER) {
        queryClient.invalidateQueries([
          'servers',
          serverId,
          'channels',
          channelId,
          'messages'
        ] as InvalidateQueryFilters)
      } else {
        queryClient.invalidateQueries([
          'dm',
          'channels',
          channelId,
          'messages'
        ] as InvalidateQueryFilters)
      }
      callback()
    }
  })
  return mut
}

/**
 * Fetches a specific channel by its ID.
 * @param channelId - The ID of the channel to retrieve.
 * @returns A query object with methods for accessing and managing the fetched data.
 */
export function deleteMessageMut(
  callback: () => void,
  messageType: MessageType,
  channelId: string,
  serverId: string | null = null
): any {
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async (messageId: string) => {
      const response = await messageAxios.deleteMessage(
        messageId,
        messageType === MessageType.SERVER
      )
      return response
    },
    onSuccess: () => {
      if (messageType === MessageType.SERVER) {
        queryClient.invalidateQueries([
          'servers',
          serverId,
          'channels',
          channelId,
          'messages'
        ] as InvalidateQueryFilters)
      } else {
        queryClient.invalidateQueries([
          'dm',
          'channels',
          channelId,
          'messages'
        ] as InvalidateQueryFilters)
      }
      callback()
    }
  })
  return mut
}
