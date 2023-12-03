import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useState } from 'react'
import { StepOneValues } from '../RegisterForm.d'

/**
 * Component representing the first step of the registration form.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */
export default function StepOne(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField } = useFormikContext<StepOneValues>()

  // State to track field errors and apply delayed clearing
  const [fieldErrors, setFieldErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    confirm_password: false
  })

  /**
   * Handles the blur event for form fields.
   * @param {Event} e - The blur event.
   * @param {string} fieldName - The name of the field being blurred.
   * @returns {void}
   */
  const handleFieldBlur = (e: Event, fieldName: string): void => {
    handleBlur(e)
    validateField(fieldName)

    // Set the field error to true and clear it after a dela
    setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: true }))
    setTimeout(() => {
      setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: false }))
    }, 2000)
  }

  return (
    <div className="w-[calc(30vw)] text-default-txt">
      <h1 className="p-4 text-center text-default-txt">Start Your Journey With Critch!</h1>
      <div className="m-1 flex w-[calc(100%)] justify-between">
        <Field
          type="text"
          placeholder="First Name"
          id="first_name"
          name="first_name"
          onBlur={(e: Event): void => {
            handleFieldBlur(e, 'first_name')
          }}
          className="form-input w-48"
        />
        {fieldErrors.first_name && touched.first_name && errors.first_name && (
          <ErrorMessage name="first_name" component="div" className={`error-message`} />
        )}

        <Field
          type="text"
          placeholder="Last Name"
          id="last_name"
          name="last_name"
          onBlur={(e: Event): void => {
            handleFieldBlur(e, 'last_name')
          }}
          className="form-input w-48"
        />
        {fieldErrors.last_name && touched.last_name && errors.last_name && (
          <ErrorMessage name="last_name" component="div" className={`error-message`} />
        )}
      </div>

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

      <Field
        type="password"
        placeholder="Confirm Password"
        id="confirm_password"
        name="confirm_password"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'confirm_password')
        }}
        className="form-input m-1 w-[calc(100%)]"
      />
      {fieldErrors.confirm_password && touched.confirm_password && errors.confirm_password && (
        <ErrorMessage name="confirm_password" component="div" className={`error-message`} />
      )}
    </div>
  )
}
