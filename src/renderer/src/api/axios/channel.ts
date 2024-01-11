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

// HTTP:UPDATE Request to update a channel
export const updateChannel = async function (
  id: string,
  body: ChannelFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/channels/${id}`, body)
  return response
}

// HTTP:DELETE Request to delete a channel
export const deleteChannel = async function (id: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/channels/${id}`)
  return response
}

// HTTP:PUT Request to add a new channel member
export const putChannelMember = async function (
  userID: string,
  channelID: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.put(`/v1/channels/${channelID}/users/${userID}`)
  return response
}

// HTTP:GET Request to get channel members by channel id
export const getChannelMembers = async function (
  id: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/channels/${id}/users`, {
    params: {
      offset,
      limit
    }
  })
  return response
}

// HTTP:DELETE Request to delete a channel member
export const deleteChannelMember = async function (
  channelID: string,
  userID: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/channels/${channelID}/users/${userID}`)
  return response
}
