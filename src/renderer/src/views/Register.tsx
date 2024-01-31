import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AppIcon from '@renderer/components/AppIcon/AppIcon'
import RegisterForm from '@renderer/features/register/RegisterForm'
import { registerMut } from '@renderer/api/query/user'
import { RootState } from '@renderer/app/store'
import { useSelector } from 'react-redux'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'

export default function Register(): React.JSX.Element {
  const [step, setStep] = useState(1)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  const mut = registerMut(() => {
    navigate('/login')
  })

  const userId = useSelector((state: RootState) => state.login.userId)
  const userToken = useSelector((state: RootState) => state.login.userToken)

  useEffect(() => {
    if (userId && userToken) {
      navigate('/')
    }
  })

  /**
   * On submit form handler.
   * @param {any} {values} - The form data.
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async ({ confirm_password, ...values }: any): Promise<void> => {
    values.photo =
      values.photo ||
      'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
    try {
      await mut.mutateAsync(values)
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

  // Component
  return (
    <div
      className={`relative max-h-[calc(95vh)] min-h-[calc(95vh)] w-full flex-col items-center justify-center`}
    >
      <div
        className={`absolute left-[calc(50%)] top-[calc(50%)] flex h-[calc(70%)] w-[calc(35vw)] 
        -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-soft-white`}
      >
        <div className="h-28 w-28">
          <AppIcon width={`w-32`} height={`h-32`} />
        </div>
        <RegisterForm currentStep={step} setStep={setStep} onSubmit={handleSubmit} />
        <p className={`m-2 text-sm text-extra-gray`}>
          Already have an account?
          <Link
            to="/login"
            className={`px-1 font-semibold text-soft-purble/70 underline hover:text-soft-purble`}
          >
            Login Here!
          </Link>
        </p>
      </div>
    </div>
  )
}
