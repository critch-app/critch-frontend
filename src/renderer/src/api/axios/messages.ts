/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { MessageFormValues } from '@renderer/env'

// HTTP:GET Request to get a message by id
export const getMessage = async function (id: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/messages/${id}`)
  return response
}

// HTTP:UPDATE Request to update a message
export const updateMessage = async function (
  id: string,
  body: MessageFormValues
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(`/v1/messages/${id}`, body)
  return response
}

// HTTP:DELETE Request to delete a message
export const deleteMessage = async function (id: string): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(`/v1/messages/${id}`)
  return response
}
