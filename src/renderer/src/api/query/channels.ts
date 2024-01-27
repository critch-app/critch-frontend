/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChannelFormValues, ChannelType } from '@renderer/env.d'
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
export function addChannelMut(callback: () => void, channelType: ChannelType): any {
  const queryClient = useQueryClient()
  let serverId: string
  const mut = useMutation({
    mutationFn: async (body: ChannelFormValues) => {
      serverId = body.server_id
      const response = await channelAxios.postChannel(body, channelType === ChannelType.SERVER)
      return response
    },
    onSuccess: () => {
      if (channelType === ChannelType.SERVER) {
        queryClient.invalidateQueries(['servers', serverId, 'channels'] as InvalidateQueryFilters)
      } else {
        queryClient.invalidateQueries(['dm', 'channels'] as InvalidateQueryFilters)
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
export function getChannelByIdQuery(channelId: string, channelType: ChannelType): any {
  const query = useQuery({
    queryKey: ['channels', channelId],
    queryFn: async () => {
      const response = await channelAxios.getChannel(channelId, channelType === ChannelType.SERVER)
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
export function deleteChannelMut(callback: () => void, channelType: ChannelType): any {
  const queryClient = useQueryClient()
  let sid: string
  const mut = useMutation({
    mutationFn: async ({ channelId, serverId }: { channelId: string; serverId: string }) => {
      sid = serverId
      const response = await channelAxios.deleteChannel(
        channelId,
        channelType === ChannelType.SERVER
      )
      return response
    },
    onSuccess: () => {
      if (channelType === ChannelType.SERVER) {
        queryClient.invalidateQueries(['servers', sid, 'channels'] as InvalidateQueryFilters)
      } else {
        queryClient.invalidateQueries(['dm', 'channels'] as InvalidateQueryFilters)
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
export function updateChannelMut(callback: () => void, channelType: ChannelType): any {
  const queryClient = useQueryClient()
  let serverId: string
  const mut = useMutation({
    mutationFn: async ({ channelId, body }: { channelId: string; body: ChannelFormValues }) => {
      serverId = body.server_id
      const response = await channelAxios.updateChannel(
        channelId,
        body,
        channelType === ChannelType.SERVER
      )
      return response
    },
    onSuccess: () => {
      if (channelType === ChannelType.SERVER) {
        queryClient.invalidateQueries(['servers', serverId, 'channels'] as InvalidateQueryFilters)
      } else {
        queryClient.invalidateQueries(['dm', 'channels'] as InvalidateQueryFilters)
      }
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
      const nextPageOffset = totalPages * itemsPerPage

      if (lastPage.data.length < limit) {
        return null
      }
      return nextPageOffset
    },
    initialPageParam: offset,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000 + 5
  })

  return query
}

/**
 * Fetches channel members in an infinite loading pattern.
 * @param channelId - The ID of the channel whose members to fetch.
 * @param offset - The initial offset for pagination.
 * @param limit - The number of members to fetch per page.
 * @returns An infinite query object for managing the paginated data.
 */
export function getChannelMembersQuery(
  channelId: string,
  channelType: ChannelType,
  serverId: string,
  offset: number,
  limit: number
): any {
  let qk: string[]
  if (channelType === ChannelType.SERVER) {
    qk = ['servers', serverId, 'channels', channelId, 'members']
  } else {
    qk = ['dm', 'channels', channelId, 'members']
  }

  const query = useInfiniteQuery({
    queryKey: qk,
    queryFn: async ({ pageParam = offset }) => {
      const response = await channelAxios.getChannelMembers(
        channelId,
        channelType === ChannelType.SERVER,
        pageParam,
        limit
      )
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const totalPages = allPages.length
      const itemsPerPage = limit
      const nextPageOffset = totalPages * itemsPerPage

      if (lastPage.data.length < limit) {
        return null
      }
      return nextPageOffset
    },
    initialPageParam: offset,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000 + 5
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
export function getChannelMessagesQuery(
  channelId: string,
  channelType: ChannelType,
  serverId: string,
  offset: number,
  limit: number
): any {
  let qk: string[]
  if (channelType === ChannelType.SERVER) {
    qk = ['servers', serverId, 'channels', channelId, 'messages']
  } else {
    qk = ['dm', 'channels', channelId, 'messages']
  }
  const query = useInfiniteQuery({
    queryKey: qk,
    queryFn: async ({ pageParam = offset }) => {
      const response = await channelAxios.getChannelMessages(
        channelId,
        channelType === ChannelType.SERVER,
        pageParam,
        limit
      )
      if (response.data.error) {
        throw response.data.error
      }
      return response
    },
    getNextPageParam: (lastPage: any, allPages: any) => {
      const totalPages = allPages.length
      const itemsPerPage = limit
      const nextPageOffset = totalPages * itemsPerPage

      if (lastPage.data.length < limit) {
        return null
      }
      return nextPageOffset
    },
    initialPageParam: offset,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000 + 5
  })

  return query
}

/**
 * Updates a channel member's.
 * @param callback - A function to execute upon successful update.
 * @returns A mutation object for triggering and managing the mutation.
 */
export function putChannelMemberMut(callback: () => void): any {
  let sid: string | null
  let cid: string
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async ({
      userId,
      channelId,
      serverId
    }: {
      userId: string
      channelId: string
      serverId: string | null
    }) => {
      sid = serverId
      cid = channelId
      const response = await channelAxios.putChannelMember(userId, channelId, serverId)
      return response
    },
    onSuccess: () => {
      if (sid) {
        queryClient.invalidateQueries([
          'servers',
          sid,
          'channels',
          cid,
          'members'
        ] as InvalidateQueryFilters)
      } else {
        queryClient.invalidateQueries(['dm', 'channels', cid, 'members'] as InvalidateQueryFilters)
      }
      callback()
    }
  })
  return mut
}

/**
 * Updates a channel member's.
 * @param callback - A function to execute upon successful update.
 * @returns A mutation object for triggering and managing the mutation.
 */
export function deleteChannelMemberMut(callback: () => void): any {
  let sid: string | null
  let cid: string
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async ({
      channelId,
      userId,
      serverId
    }: {
      channelId: string
      userId: string
      serverId: string
    }) => {
      sid = serverId
      cid = channelId
      const response = await channelAxios.deleteChannelMember(channelId, userId, serverId)
      return response
    },
    onSuccess: () => {
      if (sid) {
        queryClient.invalidateQueries([
          'servers',
          sid,
          'channels',
          cid,
          'members'
        ] as InvalidateQueryFilters)
      } else {
        queryClient.invalidateQueries(['dm', 'channels', cid, 'members'] as InvalidateQueryFilters)
      }
      callback()
    }
  })
  return mut
}
