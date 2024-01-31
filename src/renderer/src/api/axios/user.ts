import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { LoginFormValues, RegisterFormValues } from '@renderer/env.d'

export const login = async function (body: LoginFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/login', body)
  return response
}

export const register = async function (body: RegisterFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/users', body)
  return response
}

export const getUserByID = async function (userId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/users/${userId}`)
  return response
}

export const deleteUser = async function (userId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/users/${userId}`)
  return response
}

export const updateUser = async function (
  userId: string,
  body: RegisterFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/users/${userId}`, body)
  return response
}

export const getUserServers = async function (
  userId: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/users/${userId}/servers`, {
    params: {
      offset,
      limit
    }
  })
  return response
}

export const getUserDmChannels = async function (
  userId: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/users/${userId}/channels`, {
    params: {
      offset,
      limit
    }
  })
  return response
}

export const getUserServerRole = async function (
  userId: string,
  serverId: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/server-role?userId=${userId}&serverId=${serverId}`)
  return response
}
