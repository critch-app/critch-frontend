import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { ServerFormValues } from '@renderer/env'

// HTTP:POST Request to add a new server
export const postServer = async function (body: ServerFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/servers', body)
  return response
}

// HTTP:GET Request to get a server by id
export const getServer = async function (id: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/servers/${id}`)
  return response
}

// HTTP:PUT Request to add a new server member
export const putServerMember = async function (
  userId: string,
  serverId: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.put(`/v1/servers/${serverId}/users/${userId}`)
  return response
}

// HTTP:GET Request to get server members by server id
export const getServerMembers = async function (
  id: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/servers/${id}/users`, {
    params: {
      offset,
      limit
    }
  })
  return response
}
