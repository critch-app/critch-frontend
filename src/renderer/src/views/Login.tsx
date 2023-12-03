/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'

import AppIcon from '@renderer/components/ServerBar/SubComponents/AppIcon'
import LoginForm from '@renderer/features/login/LoginForm'

/**
 * Component representing the login view.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */
export default function Login(): React.JSX.Element {
  /**
   * Handles the form submission.
   * @param {object} formData - The form data.
   * @returns {void}
   */
  const handleSubmit = ({ ...formData }: any): void => {
    console.log(`form submitted with values`, formData)
  }

  return (
    <div className="relative max-h-[calc(95vh)] min-h-[calc(95vh)] w-full flex-col items-center justify-center">
      <div className="absolute left-[calc(50%)] top-[calc(50%)] flex h-[calc(70%)] w-[calc(35vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-soft-white">
        <div className="h-28 w-28">
          <AppIcon />
        </div>
        <LoginForm onSubmit={handleSubmit} />
        <p className="m-2 text-sm text-extra-gray">
          New To Critch?
          <Link
            to="/register"
            className="px-1 font-semibold text-soft-purble/80 underline hover:text-soft-purble"
          >
            Create Account Here!
          </Link>
        </p>
      </div>
    </div>
  )
}
