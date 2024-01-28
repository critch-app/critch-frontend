/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { ChannelFormValues } from '@renderer/env'

// HTTP:POST Request to add a new channel
export const postChannel = async function (
  body: ChannelFormValues,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.post(`/v1/channels?isServerChannel=${isServerChannel}`, body)
  return response
}

// HTTP:GET Request to get a channel by id
export const getChannel = async function (
  id: string,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/channels/${id}?isServerChannel=${isServerChannel}`)
  return response
}

// HTTP:UPDATE Request to update a channel by channel id
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

// HTTP:DELETE Request to delete a channel by id
export const deleteChannel = async function (
  channelId: string,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(
    `/v1/channels/${channelId}?isServerChannel=${isServerChannel}`
  )
  return response
}

// HTTP:GET Request to get channel members by channel id
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

// HTTP:GET Request to get channel messages by channel id
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

// HTTP:PUT Request to add a new channel member
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

// HTTP:DELETE Request to delete a channel member
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

// HTTP:GET Request to get server channels by server id
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
