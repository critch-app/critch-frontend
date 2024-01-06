import { RegisterStepTwoValues } from '@renderer/env'
import { ErrorMessage, FormikErrors, useFormikContext } from 'formik'
import { useState } from 'react'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

/**
 * Register form step two/three component
 * @returns {React.JSX.Element}  renderer component.
 */
export default function StepTwo(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField, setFieldValue } =
    useFormikContext<RegisterStepTwoValues>()

  const [fieldErrors, setFieldErrors] = useState({
    phone: false
  })

  /**
   * Override default formik onBlur Behaviour
   * @param {string} fieldName
   * @returns {void}
   */
  const handleFieldBlur = (fieldName: string): void => {
    handleBlur({ target: { name: fieldName } })
    validateField(fieldName)

    setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: true }))
    setTimeout(() => {
      setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: false }))
    }, 2000)
  }

  return (
    <div className={`w-[calc(30vw)] text-default-txt`}>
      <h1 className={`p-4 text-center text-default-txt`}>Enter Your Phone Number</h1>
      <PhoneInputWithCountrySelect
        placeholder="Enter phone number"
        id="phone"
        name="phone"
        onChange={(value: string): Promise<void | FormikErrors<RegisterStepTwoValues>> =>
          setFieldValue('phone', value)
        }
        onBlur={(): void => handleFieldBlur('phone')}
        className={`critch-form-input my-4 w-[calc(100%)] bg-original-white p-2`}
      />
      {fieldErrors.phone && touched.phone && errors.phone && (
        <ErrorMessage name="phone" component="div" className={`critch-error-message`} />
      )}
    </div>
  )
}
