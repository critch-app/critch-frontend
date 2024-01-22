/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { ServerFormValues } from '@renderer/env'

// HTTP:POST Request to add a new server
export const postServer = async function (body: ServerFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/servers', body)
  return response
}

// HTTP:GET Request to get a server by id
export const getServer = async function (serverId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/servers/${serverId}`)
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

// HTTP:UPDATE Request to update a server
export const updateServer = async function (
  serverId: string,
  body: ServerFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/servers/${serverId}`, body)
  return response
}

// HTTP:DELETE Request to delete a server
export const deleteServer = async function (serverId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/servers/${serverId}`)
  return response
}

// HTTP:DELETE Request to delete a server member
export const deleteServerMember = async function (
  serverId: string,
  userId: string
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1
  /servers/${serverId}/users/${userId}`)
  return response
}
