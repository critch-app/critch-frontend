import { ErrorMessage, FormikErrors, useFormikContext } from 'formik'
import { useState } from 'react'
import PhoneInputWithCountrySelect from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { StepTwoValues } from '../RegisterForm.d'

/**
 * Component representing the second step of the registration form.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */
export default function StepTwo(): React.JSX.Element {
  const { errors, touched, handleBlur, validateField, setFieldValue } =
    useFormikContext<StepTwoValues>()

  // State to track field errors and apply delayed clearing
  const [fieldErrors, setFieldErrors] = useState({
    phone: false
  })

  /**
   * Handles the blur event for the phone number field.
   * @param {string} fieldName - The name of the field being blurred.
   * @returns {void}
   */
  const handleFieldBlur = (fieldName: string): void => {
    handleBlur({ target: { name: fieldName } })
    validateField(fieldName)

    // Set the field error to true and clear it after a delay
    setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: true }))
    setTimeout(() => {
      setFieldErrors((prevFieldErrors) => ({ ...prevFieldErrors, [fieldName]: false }))
    }, 2000)
  }

  return (
    <div className="w-[calc(30vw)] text-default-txt">
      <h1 className="p-4 text-center text-default-txt">Enter Your Phone Number</h1>
      <PhoneInputWithCountrySelect
        placeholder="Enter phone number"
        id="phone"
        name="phone"
        onChange={(value: string): Promise<void | FormikErrors<StepTwoValues>> =>
          setFieldValue('phone', value)
        }
        onBlur={(): void => handleFieldBlur('phone')}
        className="form-input my-4 w-[calc(100%)] bg-original-white p-2"
      />
      {fieldErrors.phone && touched.phone && errors.phone && (
        <ErrorMessage name="phone" component="div" className="error-message" />
      )}
    </div>
  )
}
