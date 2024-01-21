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
export const getUserByID = async function (id: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/users/${id}`)
  return response
}

// HTTP:DELETE Request to delete a user
export const deleteUser = async function (id: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/users/${id}`)
  return response
}

// HTTP:UPDATE Request to update a user
export const updateUser = async function (
  id: string,
  body: RegisterFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/users/${id}`, body)
  return response
}

// HTTP:GET Request to get user's servers
export const getUserServers = async function (
  id: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/users/${id}/servers`, {
    params: {
      offset,
      limit
    }
  })
  return response
}

// HTTP:GET Request to get user's channels
export const getUserChannels = async function (
  id: string,
  offset: number,
  limit: number
): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/users/${id}/channels`, {
    params: {
      offset,
      limit
    }
  })
  return response
}
