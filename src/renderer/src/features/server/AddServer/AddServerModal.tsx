/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { ServerFormValues } from '@renderer/env'
import serverSchema from '@renderer/util/validation/serverSchema'
import FormFields from '@renderer/features/server/AddServer/SubComponents/FormFields'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { addServerMut } from '@renderer/api/query/server'
import { useState } from 'react'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
/**
 * Modal contain the add server form
 * @param {any} toggleModal - Modal State control
 * @returns {React.JSX.Element} renderer component.
 */

export default function AddServerModal({
  toggleModal
}: {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
  const mut = addServerMut(() => {})
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const [apiError, setApiError] = useState('')
  /**
   * On submit handler
   * @param {ServerFormValues} {values}
   * @returns {void}
   */
  const onSubmit = async (values: ServerFormValues): Promise<void> => {
    values.photo =
      values.photo ||
      `https://images.placeholders.dev/?width=128&height=128&text=${values.name
        .slice(0, 2)
        .toUpperCase()}&bgColor=%23f7f6f6&textColor=%236d6e71`
    values.owner_id = loggedInUserId
    try {
      const res = await mut.mutateAsync(values)
      if (res.data) {
        toggleModal(false)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }

  // Handle error state
  if (mut.status == 'error') {
    return <Error error={apiError} />
  }

  // Handle loading state
  if (mut.status == 'pending') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  // Component
  return (
    <div className={`relative`}>
      <div
        className={`h-[calc(50vh)] w-[calc(50vw)] flex-col items-center 
        justify-center rounded-lg bg-soft-white p-5 text-default-txt`}
      >
        <Formik
          initialValues={serverSchema.initialValues}
          validationSchema={serverSchema.schema}
          onSubmit={onSubmit}
          validateOnBlur={true}
        >
          <Form className={`flex justify-center`}>
            <FormFields />
          </Form>
        </Formik>
      </div>
      <button
        onClick={(): void => {
          toggleModal(false)
        }}
        className={`absolute right-5 top-5 text-lg text-default-txt hover:text-soft-purble`}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  )
}
