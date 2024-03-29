import { getUserByIdQuery } from '@renderer/api/query/user'
import { useEffect, useState } from 'react'
import Error from '@renderer/components/Error/Error'
import Loading from '@renderer/components/Loading/Loading'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import Modal from '@renderer/components/Modal/Modal'
export default function Message({
  senderId,
  content,
  mine,
  sentAt,
  attachment
}: {
  senderId: string
  content: string
  mine: boolean
  sentAt: string
  attachment: string
}): React.JSX.Element {
  const query = getUserByIdQuery(senderId)
  const [user, setUser] = useState({}) as any
  const [apiError, setApiError] = useState('')
  const [isImageModal, toggleImageModal] = useState(false)

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
    <>
      {isImageModal && (
        <Modal>
          <img
            src={attachment}
            alt="Embeded img"
            className="w-96 cursor-pointer rounded-lg"
            onClick={() => {
              toggleImageModal(false)
            }}
          />
        </Modal>
      )}
      <div className={`relative m-4 flex p-2 ${mine ? 'justify-end' : ''}`}>
        {!mine ? (
          <img
            src={user.photo}
            alt={`${user.first_name} Avatar`}
            className="mx-2 h-8 w-8 rounded-full"
          />
        ) : null}

        <div
          className={`  relative  w-96 rounded-md p-2 text-lg ${
            mine ? 'bg-soft-purble  text-soft-white' : 'bg-soft-white text-default-txt'
          }`}
        >
          <RenderContent cn={content} />
          {attachment && (
            <img
              src={attachment}
              alt="Embeded img"
              className="w-44 cursor-pointer rounded-lg"
              onClick={() => {
                toggleImageModal(true)
              }}
            />
          )}
          <span
            className={`absolute -bottom-5  ${mine ? 'left-2' : 'right-2'} text-xs text-secondry-gray`}
          >
            {user.first_name} , {sentAt.split('.')[0]}
          </span>
        </div>

        {mine ? (
          <img
            src={user.photo}
            alt={`${user.first_name} Avatar`}
            className={`mx-2 h-8 w-8 rounded-full`}
          />
        ) : null}
      </div>
    </>
  )
}

const RenderContent = ({ cn }: { cn: string }): React.JSX.Element => {
  const invitationRegex = new RegExp(/^critch-invitation:\/\/.+/)
  if (!cn) {
    return <span hidden={true}></span>
  } else if (Yup.string().trim().url().isValidSync(cn)) {
    return (
      <a
        href={cn}
        target="_blank"
        rel="noopener noreferrer"
        className={`hover:text-original-white/50`}
      >
        Link <FontAwesomeIcon icon={faLink} />
      </a>
    )
  } else if (invitationRegex.test(cn)) {
    return (
      <a
        href={cn}
        target="_blank"
        rel="noopener noreferrer"
        className={`hover:text-original-white/50`}
      >
        Invitation <FontAwesomeIcon icon={faLink} />
      </a>
    )
  } else {
    return <pre className=" text-wrap break-words">{cn}</pre>
  }
}
