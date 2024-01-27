/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { ChannelFormValues, ChannelType } from '@renderer/env.d'
import channelSchema from '@renderer/util/validation/channelSchema'
import FormFields from '@renderer/features/server/AddChannel/SubComponents/FormFields'
import { RootState } from '@renderer/app/store'
import { useSelector } from 'react-redux'
import { addChannelMut } from '@renderer/api/query/channels'
import { useState } from 'react'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
/**
 * Modal contain the add server form
 * @param {any} toggleModal - Modal State control
 * @returns {React.JSX.Element} renderer component.
 */

export default function AddChannelModal({
  toggleModal
}: {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const mut = addChannelMut(() => {}, ChannelType.SERVER)
  const [apiError, setApiError] = useState('')
  /**
   * On submit handler
   * @param {ChannelFormValues} {values}
   * @returns {void}
   */
  const onSubmit = async (values: ChannelFormValues): Promise<void> => {
    values.server_id = activeServer
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
    return <Error error={apiError} reset={mut.reset} />
  }

  // Handle loading state
  if (mut.status == 'pending') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  return (
    <div className={`relative`}>
      <div
        className={`h-[calc(50vh)] w-[calc(50vw)] flex-col items-center 
        justify-center rounded-lg bg-soft-white p-5 text-default-txt`}
      >
        <Formik
          initialValues={channelSchema.initialValues}
          validationSchema={channelSchema.schema}
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
