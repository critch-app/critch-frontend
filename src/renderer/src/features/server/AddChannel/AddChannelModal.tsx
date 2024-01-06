/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import { ChannelFormValues } from '@renderer/env'
import channelSchema from '@renderer/util/validation/channelSchema'
import FormFields from '@renderer/features/server/AddChannel/SubComponents/FormFields'
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
  /**
   * On submit handler
   * @param {ChannelFormValues} {values}
   * @returns {void}
   */
  const onSubmit = (values: ChannelFormValues): void => {
    values.server_id = '1'
    console.log(`form submitted with values`, values)
    toggleModal(false)
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
