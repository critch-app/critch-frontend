/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserByIdQuery } from '@renderer/api/query/user'
import { RootState } from '@renderer/app/store'
import Loading from '@renderer/components/Loading/Loading'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Error from '@renderer/components/Error/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

/**
 * TODO: Under Development
 * User Bar Component
 * @returns {React.JSX.Element} renderer component
 */
export default function UserBar(): React.JSX.Element {
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const loggedInUserToken = useSelector((state: RootState) => state.login.loggedInUserToken)

  const query = getUserByIdQuery(loggedInUserId)
  const [user, setUser] = useState({}) as any
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        if (loggedInUserId && loggedInUserToken) {
          await query
          const userData = query.data.data
          if (userData) {
            await setUser(userData)
          }
        }
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          setApiError(error.response.data.message)
        } else {
          setApiError('An unexpected error occurred')
        }
      }
    })()
  }, [user, query.status])

  // Handle error state
  if (query.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (query.status === 'pending') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  // Component
  if (!query.isLoading && !query.isError && query.data && user) {
    return (
      <div
        className={`relative my-auto ml-1 h-[calc(100vh-1.3rem)] w-[calc(100vw/4.5)] 
        flex-col rounded-lg bg-gradient-to-br from-original-white to-hard-white`}
      >
        <div
          className={`px-auto relative w-full -translate-y-16 flex-col items-center justify-center py-4`}
        >
          <img
            src={user.photo}
            className={`relative z-40 h-32 w-32 translate-x-1/2 translate-y-1/2 rounded-full drop-shadow-2xl`}
          />
          <div
            className={`m-2 h-80 w-56 rounded-lg bg-gradient-to-tr from-soft-purble to-hard-purble 
            pt-16 text-original-white drop-shadow-2xl`}
          >
            <h1 className={`text-md p-1`}>
              Name: {user.first_name} {user.last_name}
            </h1>
            <h2 className={`p-1 text-sm`}>
              Email: {user.email}{' '}
              <FontAwesomeIcon
                icon={faCopy}
                onClick={async (): Promise<void> => {
                  await window.api.writeToClipboard(user.email)
                  await window.api.showNotifications('Email copied to clipoard', user.email)
                }}
                className={`text-md cursor-pointer p-1 duration-150 hover:scale-150`}
              />
            </h2>
            <h2 className={`p-1 text-sm`}>
              Phone: {user.phone}{' '}
              <FontAwesomeIcon
                icon={faCopy}
                onClick={async (): Promise<void> => {
                  await window.api.writeToClipboard(user.phone)
                  await window.api.showNotifications('Phone number copied to clipoard', user.phone)
                }}
                className={`text-md cursor-pointer p-1 duration-150 hover:scale-150`}
              />
            </h2>
            <h2 className={`p-1 text-sm`}>Status: {user.status}</h2>
            <h2 className={`h-6 w-full p-1 text-sm font-light`}>
              ID: <span>{user?.id?.slice(1, 17)}...</span>
              <FontAwesomeIcon
                icon={faCopy}
                onClick={async (): Promise<void> => {
                  await window.api.writeToClipboard(user.id)
                  await window.api.showNotifications('ID copied to clipoard', user.id)
                }}
                className={`text-md cursor-pointer p-1 duration-150 hover:scale-150`}
              />
            </h2>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className={`relative my-auto ml-1 flex h-[calc(100vh-1.3rem)]
      w-[calc(100vw/4.5)] rounded-lg bg-soft-white`}
    ></div>
  )
}
