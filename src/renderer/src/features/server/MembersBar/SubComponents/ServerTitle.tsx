/* eslint-disable @typescript-eslint/no-explicit-any */
// import Divider from '@renderer/components/Divider/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import Modal from '@renderer/components/Modal/Modal'
import ServerSettingsModal from '../../ServerSettings/ServerSettingsModal'
import { getUserRoleQuery } from '@renderer/api/query/user'
import { RootState } from '@renderer/app/store'
import { useSelector } from 'react-redux'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
/**
 * TODO: Under development
 * ServerTitle component
 * @property {any} name - Server name
 * @property {any} cover - Server cover
 * @returns {any} renderer component.
 */
export default function ServerTitle({ name, cover }: any): React.JSX.Element {
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const roleQuery = getUserRoleQuery(loggedInUserId, activeServer)
  const [role, setRole] = useState('')
  const [apiError, setApiError] = useState('')

  useEffect(() => {
    try {
      if (activeServer && loggedInUserId && roleQuery.isSuccess) {
        setRole(roleQuery.data.data.role)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [roleQuery.data, activeServer, loggedInUserId])

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
  const [isSettingsModalOpened, toggleSettingsModal] = useState(false)
  return (
    <>
      {isSettingsModalOpened && (
        <Modal>
          <ServerSettingsModal toggleModal={toggleSettingsModal} />
        </Modal>
      )}
      <div className={`relative`}>
        <img src={cover} alt="" className="p-2" />
        <div
          className={`absolute bottom-3 left-4 flex w-[calc(100%-2rem)] items-center justify-between 
          rounded-lg bg-primary-gray/30 px-2 py-1 text-lg text-soft-white backdrop-blur-md`}
        >
          <span>{name}</span>
          {(role === 'owner' || role === 'admin') && (
            <FontAwesomeIcon
              icon={faGear}
              className={`cursor-pointer text-xl duration-150 hover:rotate-90 hover:scale-125`}
              onClick={(): void => {
                toggleSettingsModal(true)
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
