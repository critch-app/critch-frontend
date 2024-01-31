import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setActiveChannelId } from '@renderer/reducers/channelReducer'
import AddChannelModal from '../../AddChannel/AddChannelModal'
import Modal from '@renderer/components/Modal/Modal'
import { getUserRoleQuery } from '@renderer/api/query/user'
import { RootState } from '@renderer/app/store'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'

export default function ServerControl(): React.JSX.Element {
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const userId = useSelector((state: RootState) => state.login.userId)
  const dispatch = useDispatch()
  const roleQuery = getUserRoleQuery(userId as string, activeServerId as string)
  const [isAddChannelModalOpened, toggleAddChannelModal] = useState(false)
  const [role, setRole] = useState('')
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    try {
      if (activeServerId && userId && roleQuery.isSuccess) {
        setRole(roleQuery.data.data.role)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [roleQuery.data, activeServerId, userId])

  // Handle error state
  if (roleQuery.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (roleQuery.status === 'loading') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  return (
    <>
      {isAddChannelModalOpened ? (
        <Modal>
          <AddChannelModal toggleModal={toggleAddChannelModal} />
        </Modal>
      ) : null}
      <div className={`flex-col items-center justify-center`}>
        <div
          className={`m-1 cursor-pointer rounded-md bg-original-white px-2 py-1
         text-default-txt duration-150 hover:bg-soft-purble hover:text-original-white`}
          onClick={(): void => {
            dispatch(setActiveChannelId(null))
          }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div
          className={`m-1 cursor-pointer rounded-md bg-original-white px-2 py-1
         text-default-txt duration-150 hover:bg-soft-purble hover:text-original-white`}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        {(role === 'owner' || role === 'admin') && (
          <div
            onClick={(): void => {
              toggleAddChannelModal(true)
            }}
            className={`m-1 cursor-pointer rounded-md bg-original-white px-2 py-1
         text-default-txt duration-150 hover:bg-soft-purble hover:text-original-white`}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
        )}
      </div>
    </>
  )
}
