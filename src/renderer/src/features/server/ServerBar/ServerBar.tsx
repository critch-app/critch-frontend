/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Divider from '@renderer/components/Divider/Divider'
import AppIcon from '@renderer/components/AppIcon/AppIcon'
import ServerIcon from '@renderer/features/server/ServerBar/SubComponents/ServerIcon'
import { RootState } from '@renderer/app/store'
import { setActiveServer } from '@renderer/features/server/ServerBar/serverBarReducer'
import { setActiveChannel } from '@renderer/features/server/ChannelsBar/channelsBarReducer'
import AddServerModal from '@renderer/features/server/AddServer/AddServerModal'
import Modal from '@renderer/components/Modal/Modal'
import { Link } from 'react-router-dom'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { getUserServersQuery } from '@renderer/api/query/user'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'
/**
 * Servers bar component
 * @returns {React.JSX.Element} renderer component.
 */

export default function ServerBar(): React.JSX.Element {
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const dispatch = useDispatch()

  const [apiError, setApiError] = useState('')
  const [isAddServerModalOpened, toggleAddServerModal] = useState(false)
  const [servers, setServers] = useState<any[]>([])

  const query = getUserServersQuery(loggedInUserId, 0, 50)
  const { ref } = useInfiniteScroll(query)

  useEffect(() => {
    try {
      if (loggedInUserId && query.isSuccess) {
        const newServers: any = []
        query.data.pages.forEach((page) => {
          newServers.push(...page.data)
        })
        setServers(newServers)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [query.data, loggedInUserId])

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

  return (
    <>
      {isAddServerModalOpened ? (
        <Modal>
          <AddServerModal toggleModal={toggleAddServerModal} />
        </Modal>
      ) : null}
      <div
        className={`mb-0.5 ml-0.5 mr-1 mt-0.5 h-[calc(100vh-1rem)] w-24 rounded-2xl bg-hard-white `}
      >
        <div className={`mx-auto w-[calc(100%)] duration-150 hover:scale-125`}>
          <Link
            to="/"
            onClick={(): void => {
              dispatch(setActiveServer(null))
            }}
          >
            <AppIcon width={`w-24`} height={`h-24`} />
          </Link>
        </div>

        <Divider width={'w-[calc(100%-1rem)]'} bgColor={'bg-primary-gray'} />
        <div className={`critch-overflow-hidden-scroll h-[calc(85%)] overflow-y-scroll`}>
          <div
            onClick={(): void => {
              toggleAddServerModal(true)
            }}
            className={`mx-auto my-1 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full
            bg-original-white text-lg text-default-txt duration-150 hover:bg-soft-purble
            hover:text-original-white`}
          >
            <FontAwesomeIcon icon={faPlus} />
          </div>
          {servers?.map((server) => {
            return (
              <ServerIcon
                key={server.id}
                id={server.id}
                name={server.name}
                photo={server.photo}
                active={server.id === activeServer ? true : false}
                clickHandler={(): void => {
                  dispatch(setActiveServer(server.id))
                  dispatch(setActiveChannel(null))
                }}
              />
            )
          })}
          <div ref={ref}></div>
        </div>
      </div>
    </>
  )
}
