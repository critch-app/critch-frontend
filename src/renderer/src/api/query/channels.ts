import { ChannelFormValues, ChannelType } from '@renderer/env.d'
import * as channelAxios from '../axios/channel'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query'

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
