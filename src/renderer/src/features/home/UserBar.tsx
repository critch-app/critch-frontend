import { getUserByIdQuery } from '@renderer/api/query/user'
import { RootState } from '@renderer/app/store'
import Loading from '@renderer/components/Loading/Loading'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Error from '@renderer/components/Error/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

export default function UserBar(): React.JSX.Element {
  const userId = useSelector((state: RootState) => state.login.userId)
  const userToken = useSelector((state: RootState) => state.login.userToken)

  const query = getUserByIdQuery(userId as string)
  const [user, setUser] = useState({}) as any
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        if (userId && userToken) {
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
  if (query.status === 'loading') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  // Component
  {
    return (
      <div
        className={`relative my-auto ml-1 h-[calc(100vh-1.3rem)] w-[calc(100vw/4.5)] 
        flex-col rounded-lg bg-gradient-to-br from-original-white to-hard-white`}
      >
        <div
          className={`m-2 flex h-[calc(98%)] w-56 items-center justify-center rounded-lg bg-gradient-to-tr from-soft-purble to-hard-purble`}
        >
          <div className=" flex h-[calc(98%)]  w-52 flex-col items-center justify-start rounded-lg bg-soft-white p-2">
            <div className="h-fit  w-fit rounded-full border-r-4 border-solid border-soft-purble p-2">
              <div className="h-fit w-fit  rounded-full border-l-4 border-solid border-soft-purble  p-2">
                <img src={user.photo} className={` h-24 w-24  rounded-full drop-shadow-2xl`} />
              </div>
            </div>
            <div>
              <p className={`p-1 text-lg`}>
                {user.first_name} {user.last_name}
              </p>
              <div className="flex flex-col items-center">
                <p className={`p-1 text-sm`}>
                  Email: {user.email}{' '}
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={async (): Promise<void> => {
                      await window.api.writeToClipboard(user.email)
                      await window.api.showNotifications('Email copied to clipoard', user.email)
                    }}
                    className={`text-md cursor-pointer p-1 duration-150 hover:scale-150`}
                  />
                </p>
                <p className={`p-1 text-sm`}>
                  Phone: {user.phone}{' '}
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={async (): Promise<void> => {
                      await window.api.writeToClipboard(user.phone)
                      await window.api.showNotifications(
                        'Phone number copied to clipoard',
                        user.phone
                      )
                    }}
                    className={`text-md cursor-pointer p-1 duration-150 hover:scale-150`}
                  />
                </p>
                <p className={`p-1 text-sm`}>Status: {user.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
