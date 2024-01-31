/* eslint-disable prettier/prettier */
/// <reference types="vite/client" />

// @MultiUsage
export type OnSubmitFunction = (params: object) => void

// @Login
export interface LoginFormValues {
  email: string
  password: string
}

// @Register
export type SetStepFunction = (step: number) => void

export type SetNextStepFunction = (status: boolean) => void

export interface RegisterStepOneValues {
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
}

export interface RegisterStepTwoValues {
  phone: string
}

export interface RegisterStepThreeValues {
  status: strign
  photo: string
}

export interface RegisterFormValues
  extends RegisterStepOneValues,
    RegisterStepTwoValues,
    RegisterStepThreeValues {
  confirm_password?: never
}
// @Server
export interface ServerFormValues {
  name: string
  description: string
  photo: string
  owner_id: string
}

// @Channel

export interface ChannelFormValues {
  name: string
  description: string
  server_id: string
}

export enum ChannelType {
  DM = 'DM',
  SERVER = 'Server'
}

// @Message

export interface MessageFormValues {
  content: string
  attachment: string
}

export enum MessageType {
  DM = 'DM',
  SERVER = 'Server'
}

// ws Events
export enum EventType {
  MESSAGE = 'message',
  NOTIFICATION = 'notification',
  ERROR = 'error',
  RTC_OFFER = 'rtc_offer',
  RTC_ANSWER = 'rtc_answer',
  ICE_CANDIDATE = 'ice_candidate',
  RUNNING_MEETINGS = 'running_meetings',
  NEW_MEETING = 'new_meeting',
  CLOSE_MEETING = 'close_meeting'
}
