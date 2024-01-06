/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChannelFormValues } from '@renderer/env'
import * as channelAxios from '../axios/channel'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

/**
 * Creates a mutation for adding a new channel.
 * @param callback - A function to execute upon successful channel creation.
 * @returns A mutation object with methods for triggering and managing the mutation.
 */
export function addChannelMut(callback: () => void): any {
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async (body: ChannelFormValues) => {
      const response = await channelAxios.postChannel(body)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['channels'] as InvalidateQueryFilters)
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
export function getChannelByIDQuery(channelId: string): any {
  const query = useQuery({
    queryKey: ['channels', channelId],
    queryFn: async () => {
      const response = await channelAxios.getChannel(channelId)
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  })
  return query
}
