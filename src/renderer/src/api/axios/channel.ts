import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { ChannelFormValues } from '@renderer/env.d'

export const postChannel = async function (
  body: ChannelFormValues,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.post(`/v1/channels?isServerChannel=${isServerChannel}`, body)
  return response
}

export const getChannel = async function (
  id: string,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/channels/${id}?isServerChannel=${isServerChannel}`)
  return response
}

export const updateChannel = async function (
  channelId: string,
  body: ChannelFormValues,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(
    `/v1/channels/${channelId}?isServerChannel=${isServerChannel}`,
    body
  )
  return response
}

export const deleteChannel = async function (
  channelId: string,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(
    `/v1/channels/${channelId}?isServerChannel=${isServerChannel}`
  )
  return response
}

export const getChannelMembers = async function (
  channelId: string,
  isServerChannel: boolean,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(
    `/v1/channels/${channelId}/users?isServerChannel=${isServerChannel}`,
    {
      params: {
        offset,
        limit
      }
    }
  )
  return response
}

export const getChannelMessages = async function (
  channelId: string,
  isServerChannel: boolean,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(
    `/v1/channels/${channelId}/messages?isServerChannel=${isServerChannel}`,
    {
      params: {
        offset,
        limit
      }
    }
  )
  return response
}

export const putChannelMember = async function (
  userId: string,
  channelId: string,
  serverId: string | null = null
): Promise<AxiosResponse> {
  const response = await axiosInstance.put(
    `/v1/channels/${channelId}/users/${userId}${serverId ? `?serverId=${serverId}` : null}`
  )
  return response
}

export const deleteChannelMember = async function (
  channelId: string,
  userId: string,
  serverId: string | null = null
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(
    `/v1/channels/${channelId}/users/${userId}${serverId ? `?serverId=${serverId}` : null}`
  )
  return response
}

export const getServerChannels = async function (
  serverId: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/servers/${serverId}/channels`, {
    params: {
      offset,
      limit
    }
  })
  return response
}
