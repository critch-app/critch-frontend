import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useState } from 'react'

import { FormValues } from '../LoginForm.d'

/**
 * Component representing the form fields for the login form.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */
export default function FormFields(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField } = useFormikContext<FormValues>()

  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false
  })

  /**
   * Handles the onBlur event for a form field.
   * @param {Event} e - The onBlur event.
   * @param {string} fieldName - The name of the form field.
   * @returns {void}
   */
  const handleFieldBlur = (e: Event, fieldName: string): void => {
    handleBlur(e)
    validateField(fieldName)

    // Set the field error to true and clear it after a delay
    setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: true }))
    setTimeout(() => {
      setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: false }))
    }, 2000)
  }

  return (
    <div className="w-[calc(30vw)] text-default-txt">
      <h1 className="p-4 text-center text-default-txt">Welcome Back!</h1>
      <Field
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'email')
        }}
        className="form-input m-1 w-[calc(100%)]"
      />
      {fieldErrors.email && touched.email && errors.email && (
        <ErrorMessage name="email" component="div" className={`error-message`} />
      )}

      <Field
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'password')
        }}
        className="form-input m-1 w-[calc(100%)]"
      />
      {fieldErrors.password && touched.password && errors.password && (
        <ErrorMessage name="password" component="div" className={`error-message`} />
      )}
      <div className="flex justify-center">
        <button
          type="submit"
          className="m-0.5 rounded-md bg-soft-purble p-1.5 text-sm text-original-white hover:bg-soft-purble/80"
        >
          Login
        </button>
      </div>
    </div>
  )
}
