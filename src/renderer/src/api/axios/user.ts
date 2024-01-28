/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { LoginFormValues, RegisterFormValues } from '@renderer/env'

// HTTP:POST Request to login a user
export const login = async function (body: LoginFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/login', body)
  return response
}

// HTTP:POST Request to add a new user
export const register = async function (body: RegisterFormValues): Promise<AxiosResponse> {
  const response = await axiosInstance.post('/v1/users', body)
  return response
}

// HTTP:PUT Request to add a new server member
export const getUserByID = async function (userId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/users/${userId}`)
  return response
}

// HTTP:DELETE Request to delete a user
export const deleteUser = async function (userId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/users/${userId}`)
  return response
}

// HTTP:UPDATE Request to update a user
export const updateUser = async function (
  userId: string,
  body: RegisterFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/users/${userId}`, body)
  return response
}

// HTTP:GET Request to get user's servers
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

// HTTP:GET Request to get user's channels
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
