/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChannelFormValues } from '@renderer/env'
import * as channelAxios from '../axios/channel'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery
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

export function deleteChannelMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async (channelId: string) => {
      const response = await channelAxios.deleteChannel(channelId)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}

export function updateChannelMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async ({ channelId, body }: { channelId: string; body: ChannelFormValues }) => {
      const response = await channelAxios.updateChannel(channelId, body)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}

/**
 * Fetches a specific server channels by server id.
 * @param serverId - The ID of the server to retrieve its channels.
 * @returns A query object with methods for accessing and managing the fetched data.
 */
export function getServerChannelsQuery(serverId: string, offset: number, limit: number): any {
  const query = useInfiniteQuery({
    queryKey: ['servers', serverId, 'channels'],
    queryFn: async ({ pageParam = offset }) => {
      const response = await channelAxios.getServerChannels(serverId, pageParam, limit)
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const totalPages = allPages.length
      const itemsPerPage = limit
      const totalCount = totalPages * itemsPerPage

      return totalCount > lastPage.length ? lastPage.length : undefined
    },
    initialPageParam: offset,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  })

  return query
}

/**
 * Fetches a DM channels
 * @param isServerChannel - Essential to search for a server channel otherwise it's considered a direct message channel.
 * @returns A query object with methods for accessing and managing the fetched data.
 */
export function getDMChannelsQuery(offset: number, limit: number, isServerChannel: boolean): any {
  const query = useInfiniteQuery({
    queryKey: ['channels', isServerChannel],
    queryFn: async ({ pageParam = offset }) => {
      const response = await channelAxios.getChannels(pageParam, limit, isServerChannel)
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const totalPages = allPages.length
      const itemsPerPage = limit
      const totalCount = totalPages * itemsPerPage

      return totalCount > lastPage.length ? lastPage.length : undefined
    },
    initialPageParam: offset,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  })

  return query
}

/**
 * Updates a channel member's.
 * @param callback - A function to execute upon successful update.
 * @returns A mutation object for triggering and managing the mutation.
 */
export function putChannelMemberMut(callback: () => void): any {
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async ({ userId, channelId }: { userId: string; channelId: string }) => {
      const response = await channelAxios.putChannelMember(userId, channelId)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['channels', '*', 'members'] as InvalidateQueryFilters)
      callback()
    }
  })
  return mut
}

/**
 * Fetches channel members in an infinite loading pattern.
 * @param channelId - The ID of the channel whose members to fetch.
 * @param offset - The initial offset for pagination.
 * @param limit - The number of members to fetch per page.
 * @returns An infinite query object for managing the paginated data.
 */
export function getChannelMembersQuery(channelId: string, offset: number, limit: number): any {
  const query = useInfiniteQuery({
    queryKey: ['channels', channelId, 'members'],
    queryFn: async ({ pageParam = offset }) => {
      const response = await channelAxios.getChannelMembers(channelId, pageParam, limit)
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const totalPages = allPages.length
      const itemsPerPage = limit
      const totalCount = totalPages * itemsPerPage

      return totalCount > lastPage.length ? lastPage.length : undefined
    },
    initialPageParam: offset,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  })

  return query
}

/**
 * Fetches channel messages in an infinite loading pattern.
 * @param channelId - The ID of the channel whose members to fetch.
 * @param offset - The initial offset for pagination.
 * @param limit - The number of members to fetch per page.
 * @returns An infinite query object for managing the paginated data.
 */
export function getChannelMessagesQuery(channelId: string, offset: number, limit: number): any {
  const query = useInfiniteQuery({
    queryKey: ['channels', channelId, 'messages'],
    queryFn: async ({ pageParam = offset }) => {
      const response = await channelAxios.getChannelMessages(channelId, pageParam, limit)
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const totalPages = allPages.length
      const itemsPerPage = limit
      const totalCount = totalPages * itemsPerPage

      return totalCount > lastPage.length ? lastPage.length : undefined
    },
    initialPageParam: offset,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000
  })

  return query
}

export function deleteChannelMemberMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async ({ channelId, userId }: { channelId: string; userId: string }) => {
      const response = await channelAxios.deleteChannelMember(channelId, userId)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}
