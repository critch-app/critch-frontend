/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { MessageFormValues } from '@renderer/env'

// HTTP:GET Request to get a message by id
export const getMessage = async function (messageId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/messages/${messageId}`)
  return response
}

// HTTP:UPDATE Request to update a message
export const updateMessage = async function (
  messageId: string,
  body: MessageFormValues,
  isServerMessage: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.patch(
    `/v1/messages/${messageId}?isServerMessage=${isServerMessage}`,
    body
  )
  return response
}

// HTTP:DELETE Request to delete a message
export const deleteMessage = async function (
  messageId: string,
  isServerMessage: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(
    `/v1/messages/${messageId}?isServerMessage=${isServerMessage}`
  )
  return response
}
