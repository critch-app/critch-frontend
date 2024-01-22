/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { ChannelFormValues } from '@renderer/env'

// HTTP:POST Request to add a new channel
export const postChannel = async function (body: ChannelFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/channels', body)
  return response
}

// HTTP:GET Request to get a channel by id
export const getChannel = async function (id: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/channels/${id}`)
  return response
}

// HTTP:UPDATE Request to update a channel by channel id
export const updateChannel = async function (
  channelId: string,
  body: ChannelFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/channels/${channelId}`, body)
  return response
}

// HTTP:DELETE Request to delete a channel by id
export const deleteChannel = async function (channelId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/channels/${channelId}`)
  return response
}

// HTTP:PUT Request to add a new channel member
export const putChannelMember = async function (
  userId: string,
  channelId: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.put(`/v1/channels/${channelId}/users/${userId}`)
  return response
}

// HTTP:GET Request to get channel members by channel id
export const getChannelMembers = async function (
  channelId: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/channels/${channelId}/users`, {
    params: {
      offset,
      limit
    }
  })
  return response
}

// HTTP:GET Request to get channel messages by channel id
export const getChannelMessages = async function (
  channelId: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/channels/${channelId}/messages`, {
    params: {
      offset,
      limit
    }
  })
  return response
}

// HTTP:DELETE Request to delete a channel member
export const deleteChannelMember = async function (
  channelId: string,
  userId: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/channels/${channelId}/users/${userId}`)
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

// HTTP:GET Request to get direct message channels
export const getChannels = async function (
  offset: number,
  limit: number,
  isServerChannel: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/channels`, {
    params: {
      offset,
      limit,
      isServerChannel
    }
  })
  return response
}
