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
