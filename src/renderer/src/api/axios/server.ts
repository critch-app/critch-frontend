import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { ServerFormValues } from '@renderer/env.d'

export const postServer = async function (body: ServerFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/servers', body)
  return response
}

export const getServer = async function (serverId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/servers/${serverId}`)
  return response
}

export const putServerMember = async function (
  userId: string,
  serverId: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.put(`/v1/servers/${serverId}/users/${userId}`)
  return response
}

export const getServerMembers = async function (
  serverId: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/servers/${serverId}/users`, {
    params: {
      offset,
      limit
    }
  })
  return response
}

export const updateServer = async function (
  serverId: string,
  body: ServerFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/servers/${serverId}`, body)
  return response
}

export const deleteServer = async function (serverId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/servers/${serverId}`)
  return response
}

export const deleteServerMember = async function (
  serverId: string,
  userId: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1
  /servers/${serverId}/users/${userId}`)
  return response
}
