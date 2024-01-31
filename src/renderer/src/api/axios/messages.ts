import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'
import { MessageFormValues } from '@renderer/env.d'

export const getMessage = async function (messageId: string): Promise<AxiosResponse> {
  const response = await axiosInstance.get(`/v1/messages/${messageId}`)
  return response
}

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

export const deleteMessage = async function (
  messageId: string,
  isServerMessage: boolean
): Promise<AxiosResponse> {
  const response = await axiosInstance.delete(
    `/v1/messages/${messageId}?isServerMessage=${isServerMessage}`
  )
  return response
}
