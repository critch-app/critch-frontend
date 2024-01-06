/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginFormValues, RegisterFormValues } from '@renderer/env'
import * as userAxios from '../axios/user'
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'

export function loginMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async (body: LoginFormValues) => {
      const response = await userAxios.login(body)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}

export function registerMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async (body: RegisterFormValues) => {
      const response = await userAxios.register(body)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}

export function getUserByIdQuery(userId: string): any {
  const query = useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const response = await userAxios.getUserByID(userId)
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

export function deleteUserMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async (userId: string) => {
      const response = await userAxios.deleteUser(userId)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}

export function updateUserMut(callback: () => void): any {
  const mut = useMutation({
    mutationFn: async ({ userId, body }: { userId: string; body: RegisterFormValues }) => {
      const response = await userAxios.updateUser(userId, body)
      return response
    },
    onSuccess: () => {
      callback()
    }
  })
  return mut
}

export function getUserServersQuery(userId: string, offset: number, limit: number): any {
  const query = useInfiniteQuery({
    queryKey: [userId, 'servers'],
    queryFn: async ({ pageParam = offset }) => {
      const response = await userAxios.getUserServers(userId, pageParam, limit)
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
