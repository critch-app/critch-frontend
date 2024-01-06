/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom'

import AppIcon from '@renderer/components/AppIcon/AppIcon'
import LoginForm from '@renderer/features/login/LoginForm'
import { loginMut } from '@renderer/api/query/user'
import { setLoggedInUserID, setLoggedInUserToken } from '@renderer/features/login/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { useEffect, useState } from 'react'
import Error from '@renderer/components/Error/Error'
import Loading from '@renderer/components/Loading/Loading'
/**
 * Component represents the login view
 * @returns {React.JSX.Element} rendered component.
 */

export default function Login(): React.JSX.Element {
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  const mut = loginMut(() => {
    navigate('/')
  })

  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const loggedInUserToken = useSelector((state: RootState) => state.login.loggedInUserToken)
  const dispatch = useDispatch()
  useEffect(() => {
    if (loggedInUserId && loggedInUserToken) {
      navigate('/')
    }
  })

  /**
   * On submit form handler.
   * @param {any} {values} - The form data.
   * @returns {void}
   */
  const handleSubmit = async (values: any): Promise<void> => {
    let res
    try {
      res = await mut.mutateAsync(values)
      dispatch(setLoggedInUserID(res.data.user_id))
      dispatch(setLoggedInUserToken(res.data.token))
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
    <div
      className={`relative max-h-[calc(95vh)] min-h-[calc(95vh)] w-full flex-col items-center justify-center`}
    >
      <div
        className={`absolute left-[calc(50%)] top-[calc(50%)] flex h-[calc(70%)] w-[calc(35vw)] 
        -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-soft-white`}
      >
        <div className={`h-28 w-28`}>
          <AppIcon width={`w-32`} height={`h-32`} />
        </div>
        <LoginForm onSubmit={handleSubmit} />
        <p className={`m-2 text-sm text-extra-gray`}>
          New To Critch?
          <Link
            to="/register"
            className={`px-1 font-semibold text-soft-purble/80 underline hover:text-soft-purble`}
          >
            Create Account Here!
          </Link>
        </p>
      </div>
    </div>
  )
}
