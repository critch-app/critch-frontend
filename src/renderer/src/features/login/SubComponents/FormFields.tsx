import { LoginFormValues } from '@renderer/env.d'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useState } from 'react'

export default function FormFields(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField } = useFormikContext<LoginFormValues>()

  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false
  })

  const handleFieldBlur = (e: Event, fieldName: string): void => {
    handleBlur(e)
    validateField(fieldName)

    setFieldErrors((prevFieldErrors) => ({
      ...prevFieldErrors,
      [fieldName]: true
    }))
    setTimeout(() => {
      setFieldErrors((prevFieldErrors) => ({
        ...prevFieldErrors,
        [fieldName]: false
      }))
    }, 4000)
  }

  return (
    <div className={`w-[calc(30vw)] text-default-txt`}>
      <h1 className={`p-4 text-center text-default-txt`}>Welcome Back!</h1>
      <Field
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'email')
        }}
        className={`critch-form-input m-1 w-[calc(100%)]`}
      />
      {fieldErrors.email && touched.email && errors.email && (
        <ErrorMessage name="email" component="div" className={`critch-error-message`} />
      )}

      <Field
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'password')
        }}
        className={`critch-form-input m-1 w-[calc(100%)]`}
      />
      {fieldErrors.password && touched.password && errors.password && (
        <ErrorMessage name="password" component="div" className={`critch-error-message`} />
      )}
      <div className={`flex h-36 items-center justify-center`}>
        <button type="submit" className={'critch-button'}>
          Login
        </button>
      </div>
    </div>
  )
}
