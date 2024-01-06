import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useState } from 'react'
import { RegisterStepThreeValues } from '@renderer/env'

/**
 * Register form step three/three component
 * @returns {React.JSX.Element}  renderer component.
 */
export default function StepThree(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField, values } =
    useFormikContext<RegisterStepThreeValues>()

  const [fieldErrors, setFieldErrors] = useState({
    photo: false,
    status: false
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

  const handleImageError = (fieldName: string): void => {
    setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: true }))
  }

  return (
    <div className={`w-[calc(30vw)] flex-col items-center justify-center text-default-txt`}>
      <h1 className={`p-4 text-center text-default-txt`}>Let People Know You</h1>
      <div className={`flex items-center justify-center`}>
        {values.photo && !fieldErrors.photo ? (
          <img
            src={values.photo}
            alt="User Photo"
            onError={(): void => handleImageError('photo')}
            className={`h-24 w-24 rounded-lg`}
          />
        ) : (
          <div
            className={`flex h-24 w-24 items-center justify-center 
            rounded-lg bg-hard-white p-3 text-center text-xs`}
          >
            Photo will appear here
          </div>
        )}
      </div>
      <Field
        type="url"
        placeholder="Photo URL"
        id="photo"
        name="photo"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'photo')
        }}
        className={`critch-form-input m-1 w-[calc(100%)]`}
      />
      {fieldErrors.photo && touched.photo && errors.photo && (
        <ErrorMessage name="photo" component="div" className={`critch-error-message`} />
      )}

      <Field
        type="text"
        placeholder="Bio"
        id="status"
        name="status"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'status')
        }}
        className={`critch-form-input m-1 w-[calc(100%)]`}
      />
      {fieldErrors.status && touched.status && errors.status && (
        <ErrorMessage name="status" component="div" className={`critch-error-message`} />
      )}
      <div className={`flex justify-center`}>
        <button
          type="submit"
          className={`m-0.5 rounded-md bg-soft-purble p-1.5 
          text-sm text-original-white hover:bg-soft-purble/80`}
        >
          Signup
        </button>
      </div>
    </div>
  )
}
