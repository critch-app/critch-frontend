export type OnSubmitFunction = (params: object) => void

export type SetStepFunction = (step: number) => void

export type SetNextStepFunction = (status: boolean) => void

export interface StepOneValues {
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
}

export interface StepTwoValues {
  phone: string
}

export interface StepThreeValues {
  status: strign
  photo: string
}
