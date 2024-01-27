/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerFormValues } from '@renderer/env'
import * as serverAxios from '../axios/server'
import {
  InvalidateQueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

/**
 * Creates a mutation for adding a new server.
 * @param callback - A function to execute upon successful server creation.
 * @returns A mutation object for triggering and managing the mutation.
 */
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

/**
 * Fetches a specific server by its ID.
 * @param serverId - The ID of the server to retrieve.
 * @returns A query object for accessing and managing the fetched data.
 */
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

/**
 * Updates a server member's.
 * @param callback - A function to execute upon successful update.
 * @returns A mutation object for triggering and managing the mutation.
 */
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

/**
 * Fetches server members in an infinite loading pattern.
 * @param serverId - The ID of the server whose members to fetch.
 * @param offset - The initial offset for pagination.
 * @param limit - The number of members to fetch per page.
 * @returns An infinite query object for managing the paginated data.
 */
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
