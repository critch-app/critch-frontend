import { getUserByIdQuery } from '@renderer/api/query/user'
import { useEffect, useState } from 'react'
import Error from '@renderer/components/Error/Error'
import Loading from '@renderer/components/Loading/Loading'
export default function Message({
  senderId,
  content,
  mine,
  sentAt
}: {
  senderId: string
  content: string
  mine: boolean
  sentAt: string
}): React.JSX.Element {
  const query = getUserByIdQuery(senderId)
  const [user, setUser] = useState({}) as any
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    ;(async (): Promise<void> => {
      try {
        if (senderId) {
          await query
          const userData = query.data.data
          setUser(userData)
        }
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          setApiError(error.response.data.message)
        } else {
          setApiError('An unexpected error occurred')
        }
      }
    })()
  }, [query.status])

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

  return (
    <div className={`relative m-4 flex p-2 ${mine ? 'justify-end' : ''}`}>
      {!mine ? (
        <img src={user.photo} alt={`${user.first_name} Avatar`} className="mx-2 h-7 w-7" />
      ) : null}

      <div
        className={`w-80 overflow-hidden overflow-ellipsis rounded-md p-2 text-lg ${
          mine ? 'bg-soft-purble  text-soft-white' : 'bg-soft-white text-default-txt'
        }`}
      >
        {content}
      </div>
      <span
        className={`absolute -bottom-2  ${!mine ? 'left-48' : 'right-48'} text-xs text-secondry-gray`}
      >
        {user.first_name} , {sentAt.split('.')[0]}
      </span>
      {mine ? (
        <img src={user.photo} alt={`${user.first_name} Avatar`} className={`mx-2 h-10 w-10`} />
      ) : null}
    </div>
  )
}
