import { ServerFormValues } from '@renderer/env.d'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useState } from 'react'

export default function FormFields(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField } = useFormikContext<ServerFormValues>()

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    description: false,
    photo: false,
    owner_id: false
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
    <div className={`realtive w-[calc(30vw)] text-default-txt`}>
      <h1 className={`text-default-txt">Create New Server p-4 text-center text-lg`}>
        Create New Server
      </h1>
      <Field
        type="text"
        placeholder="Server Name"
        id="name"
        name="name"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'name')
        }}
        className={`critch-form-input m-1 w-[calc(100%)]`}
      />
      {fieldErrors.name && touched.name && errors.name && (
        <ErrorMessage
          name="name"
          component="div"
          className={`critch-error-message right-5 top-5`}
        />
      )}
      <Field
        type="text"
        placeholder="Server Logo URL"
        id="photo"
        name="photo"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'photo')
        }}
        className={`critch-form-input m-1 w-[calc(100%)]`}
      />
      {fieldErrors.photo && touched.photo && errors.photo && (
        <ErrorMessage
          name="photo"
          component="div"
          className={`critch-error-message right-5 top-5`}
        />
      )}
      <Field
        as="textarea"
        placeholder="Server Descriptions"
        id="description"
        name="description"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'description')
        }}
        className={`critch-form-input m-1 w-[calc(100%)] resize-none`}
      />
      {fieldErrors.description && touched.description && errors.description && (
        <ErrorMessage
          name="description"
          component="div"
          className={`critch-error-message right-5 top-5`}
        />
      )}
      <Field
        type="text"
        placeholder="Owner ID"
        id="owner_id"
        name="owner_id"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'owner_id')
        }}
        disabled={true}
        className={`critch-form-input m-1 hidden w-[calc(100%)]`}
      />
      {fieldErrors.owner_id && touched.owner_id && errors.owner_id && (
        <ErrorMessage
          name="owner_id"
          component="div"
          className={`critch-error-message right-5 top-5`}
        />
      )}

      <div className={`flex justify-center`}>
        <button
          type="submit"
          className={`m-0.5 rounded-md bg-soft-purble p-1.5 text-sm 
          text-original-white hover:bg-soft-purble/80`}
        >
          Create
        </button>
      </div>
    </div>
  )
}
