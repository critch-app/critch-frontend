import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useEffect, useState } from 'react'
import { RegisterStepThreeValues } from '@renderer/env.d'
import { PickerInline } from 'filestack-react'
import Modal from '@renderer/components/Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
export default function StepThree({
  setIsStepContainError
}: {
  setIsStepContainError: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
  const API_KEY = useSelector((state: RootState) => state.fileStack.API_KEY)
  const [showImagePreview, setShowImagePreview] = useState(false)
  const { errors, touched, handleBlur, validateField, values } =
    useFormikContext<RegisterStepThreeValues>()

  const [fieldErrors, setFieldErrors] = useState({
    photo: false
  })

  const [pickerState, setPickerState] = useState(false)
  const [url, setUrl] = useState<null | string>(null)
  /**
   * Override default formik onBlur Behaviour
   * @param {Event} e
   * @param {string} fieldName
   * @returns {void}
   */
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
    setIsStepContainError(errors.photo !== undefined)
  }, [errors])

  const pickerOptions = {
    accept: ['image/*'],
    disableTransformer: true,
    maxFiles: 1,
    minFiles: 1
  }

  useEffect(() => {
    if (url) {
      values.photo = url
    }
  }, [url])
  return (
    <>
      {pickerState && (
        <Modal>
          <button
            onClick={(): void => {
              setPickerState(false)
            }}
            className={`absolute right-96 top-20 rounded-lg bg-soft-white p-3 text-lg text-default-txt hover:text-soft-purble`}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <PickerInline
            apikey={API_KEY}
            pickerOptions={pickerOptions}
            onUploadDone={(res: any) => {
              setUrl(res.filesUploaded[0].url)
              setPickerState(false)
              setShowImagePreview(true)
            }}
          />
        </Modal>
      )}
      <div className={`w-[calc(30vw)] flex-col items-center justify-center text-default-txt`}>
        <h1 className={`p-4 text-center text-default-txt`}>Let People Know You</h1>
        {showImagePreview && url && (
          <div className=" relative mx-auto flex h-28 w-28 items-center justify-center rounded-lg  bg-hard-white">
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setUrl(null)}
              className=" absolute right-0 top-0 cursor-pointer p-1"
            />
            <img src={url} alt="Uploaded" className="h-20 w-20 rounded-lg" />
          </div>
        )}
        <Field
          hidden={true}
          type="url"
          placeholder="Photo URL"
          id="photo"
          name="photo"
          value={url || ''}
          onBlur={(e: Event): void => {
            handleFieldBlur(e, 'photo')
          }}
          className={`critch-form-input m-1 w-[calc(100%)]`}
        />
        {fieldErrors.photo && touched.photo && errors.photo && (
          <ErrorMessage name="photo" component="div" className={`critch-error-message`} />
        )}

        <div className={`mx-auto flex w-fit flex-col justify-center`}>
          <button
            className={`critch-button`}
            onClick={(ev): void => {
              ev.preventDefault()
              setPickerState(true)
            }}
          >
            Upload image
          </button>
          <button disabled={errors.photo === undefined} type="submit" className={`critch-button`}>
            Signup
          </button>
        </div>
      </div>
    </>
  )
}
