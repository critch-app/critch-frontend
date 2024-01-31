import { ServerFormValues } from '@renderer/env.d'
import * as serverAxios from '../axios/server'
import {
  InvalidateQueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

export function addServerMut(callback: () => void): any {
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async (body: ServerFormValues) => {
      const response = await serverAxios.postServer(body)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['servers'] as InvalidateQueryFilters)
      callback()
    }
  })
  return mut
}

export function getServerByIDQuery(serverId: string): any {
  const query = useQuery({
    queryKey: ['servers', serverId],
    queryFn: async () => {
      const response = await serverAxios.getServer(serverId)
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

export function putServerMemberMut(callback: () => void): any {
  const queryClient = useQueryClient()
  let sid: string
  const mut = useMutation({
    mutationFn: async ({ userId, serverId }: { userId: string; serverId: string }) => {
      sid = serverId
      const response = await serverAxios.putServerMember(userId, serverId)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['servers', sid, 'members'] as InvalidateQueryFilters)
      callback()
    },
    retry: false
  })
  return mut
}

export function getServerMembersQuery(serverId: string, offset: number, limit: number): any {
  const query = useInfiniteQuery({
    queryKey: ['servers', serverId, 'members'],
    queryFn: async ({ pageParam = offset }) => {
      const response = await serverAxios.getServerMembers(serverId, pageParam, limit)
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

export function updateServerMut(callback: () => void): any {
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async ({ serverId, body }: { serverId: string; body: ServerFormValues }) => {
      const response = await serverAxios.updateServer(serverId, body)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['servers'] as InvalidateQueryFilters)
      callback()
    }
  })
  return mut
}

export function deleteServerMut(callback: () => void): any {
  const queryClient = useQueryClient()
  const mut = useMutation({
    mutationFn: async (serverId: string) => {
      const response = await serverAxios.deleteServer(serverId)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['servers'] as InvalidateQueryFilters)
      callback()
    }
  })
  return mut
}

export function deleteServerMemberMut(callback: () => void): any {
  const queryClient = useQueryClient()
  let sid: string
  const mut = useMutation({
    mutationFn: async ({ userId, serverId }: { userId: string; serverId: string }) => {
      sid = serverId
      const response = await serverAxios.deleteServerMember(userId, serverId)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['servers', sid, 'members'] as InvalidateQueryFilters)
      callback()
    }
  })
  return mut
}
