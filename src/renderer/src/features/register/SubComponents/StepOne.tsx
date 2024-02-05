import { RegisterStepOneValues } from '@renderer/env.d'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'

export default function StepOne({
  setIsStepContainError
}: {
  setIsStepContainError: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
  const { errors, touched, handleBlur, validateField } = useFormikContext<RegisterStepOneValues>()

  const [fieldErrors, setFieldErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    confirm_password: false
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

  useEffect(() => {
    setIsStepContainError(
      errors.first_name !== undefined ||
        errors.last_name !== undefined ||
        errors.email !== undefined ||
        errors.password !== undefined ||
        errors.confirm_password !== undefined
    )
  }, [errors])

  return (
    <div className={`w-[calc(30vw)] text-default-txt`}>
      <h1 className={`p-4 text-center text-default-txt`}>Start Your Journey With Critch!</h1>
      <div className={`m-1 flex w-[calc(100%)] justify-between`}>
        <Field
          type="text"
          placeholder="First Name"
          id="first_name"
          name="first_name"
          onBlur={(e: Event): void => {
            handleFieldBlur(e, 'first_name')
          }}
          className={`critch-form-input w-48`}
        />
        {fieldErrors.first_name && touched.first_name && errors.first_name && (
          <ErrorMessage name="first_name" component="div" className={`critch-error-message`} />
        )}

        <Field
          type="text"
          placeholder="Last Name"
          id="last_name"
          name="last_name"
          onBlur={(e: Event): void => {
            handleFieldBlur(e, 'last_name')
          }}
          className={`critch-form-input w-48`}
        />
        {fieldErrors.last_name && touched.last_name && errors.last_name && (
          <ErrorMessage name="last_name" component="div" className={`critch-error-message`} />
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

      <Field
        type="password"
        placeholder="Confirm Password"
        id="confirm_password"
        name="confirm_password"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'confirm_password')
        }}
        className={`critch-form-input m-1 w-[calc(100%)]`}
      />
      {fieldErrors.confirm_password && touched.confirm_password && errors.confirm_password && (
        <ErrorMessage name="confirm_password" component="div" className={`critch-error-message`} />
      )}
    </div>
  )
}
