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
