import { LoginFormValues } from '@renderer/env'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useState } from 'react'

/**
 * Login Form Fields
 * @returns { React.JSX.Element} renderer component.
 */
export default function FormFields(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField } = useFormikContext<LoginFormValues>()

  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false
  })

  /**
   * Override default formik onBlur Behaviour
   * @param {Event} e
   * @param {string} fieldName
   * @returns {void}
   */
  const handleFieldBlur = (e: Event, fieldName: string): void => {
    handleBlur(e)
    validateField(fieldName)

    setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: true }))
    setTimeout(() => {
      setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: false }))
    }, 2000)
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
      <div className={`flex justify-center`}>
        <button
          type="submit"
          className={`m-0.5 rounded-md bg-soft-purble p-1.5 text-sm
           text-original-white hover:bg-soft-purble/80`}
        >
          Login
        </button>
      </div>
    </div>
  )
}
