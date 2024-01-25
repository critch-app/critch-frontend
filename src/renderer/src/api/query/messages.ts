/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageFormValues } from '@renderer/env'
import * as messageAxios from '../axios/messages'
import { useMutation, useQuery } from '@tanstack/react-query'

/**
 * Fetches a specific message by its ID.
 * @param messageId - The ID of the message to retrieve.
 * @returns A query object for accessing and managing the fetched data.
 */
export function getMessageByIdQuery(messageId: string): any {
  const query = useQuery({
    queryKey: ['messages', messageId],
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

export function updateMessageMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async ({ messageId, body }: { messageId: string; body: MessageFormValues }) => {
      const response = await messageAxios.updateMessage(messageId, body)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}

export function deleteMessageMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async (messageId: string) => {
      const response = await messageAxios.deleteMessage(messageId)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}
