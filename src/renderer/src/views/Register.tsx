/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Link } from 'react-router-dom'

import AppIcon from '@renderer/components/ServerBar/SubComponents/AppIcon'
import RegisterForm from '@renderer/features/register/RegisterForm'

/**
 * Component representing the register view.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */

export default function Register(): React.JSX.Element {
  const [step, setStep] = useState(1)

  /**
   * Handles the form submission.
   * @param {object} formData - The form data.
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = ({ confirm_password, ...formData }: any): void => {
    formData.photo =
      formData.photo ||
      'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
    console.log(`form submitted with values`, formData)
  }

  return (
    <div className="relative max-h-[calc(95vh)] min-h-[calc(95vh)] w-full flex-col items-center justify-center">
      <div className="absolute left-[calc(50%)] top-[calc(50%)] flex h-[calc(70%)] w-[calc(35vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-soft-white">
        <div className="h-28 w-28">
          <AppIcon />
        </div>
        <RegisterForm currentStep={step} setStep={setStep} onSubmit={handleSubmit} />
        <p className="m-2 text-sm text-extra-gray">
          Already have an account?
          <Link
            to="/login"
            className="px-1 font-semibold text-soft-purble/70 underline hover:text-soft-purble"
          >
            Login Here!
          </Link>
        </p>
      </div>
    </div>
  )
}
