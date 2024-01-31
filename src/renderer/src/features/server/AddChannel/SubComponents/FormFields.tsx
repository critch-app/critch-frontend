import { ChannelFormValues } from '@renderer/env.d'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useState } from 'react'

export default function FormFields(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField } = useFormikContext<ChannelFormValues>()

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    description: false,
    server_id: false
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
    }, 2000)
  }

  return (
    <div className={`realtive w-[calc(30vw)] text-default-txt`}>
      <h1 className={`text-default-txt">Create New Server p-4 text-center text-lg`}>
        Create New Channel
      </h1>
      <Field
        type="text"
        placeholder="Channel Name"
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
        as="textarea"
        placeholder="Channel Descriptions"
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
        placeholder="Sever ID"
        id="server_id"
        name="server_id"
        onBlur={(e: Event): void => {
          handleFieldBlur(e, 'server_id')
        }}
        disabled={true}
        className={`critch-form-input m-1 hidden w-[calc(100%)]`}
      />
      {fieldErrors.server_id && touched.server_id && errors.server_id && (
        <ErrorMessage
          name="server_id"
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
