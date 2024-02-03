import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Divider from '@renderer/components/Divider/Divider'
import AppIcon from '@renderer/components/AppIcon/AppIcon'
import ServerIcon from '@renderer/features/server/ServerBar/SubComponents/ServerIcon'
import { RootState } from '@renderer/app/store'
import { setActiveServerId } from '@renderer/reducers/serverReducer'
import { setActiveChannelId } from '@renderer/reducers/channelReducer'
import AddServerModal from '@renderer/features/server/AddServer/AddServerModal'
import Modal from '@renderer/components/Modal/Modal'
import { Link } from 'react-router-dom'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { getUserServersQuery } from '@renderer/api/query/user'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'
import { togglePip } from '@renderer/reducers/meetingReducer'

export default function ServerBar(): React.JSX.Element {
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const userId = useSelector((state: RootState) => state.login.userId)
  const joinedChannel = useSelector((state: RootState) => state.meeting.joinedChannel)
  const joinedServer = useSelector((state: RootState) => state.meeting.joinedServer)
  const pip = useSelector((state: RootState) => state.meeting.pip)
  const dispatch = useDispatch()

  const [apiError, setApiError] = useState('')
  const [isAddServerModalOpened, toggleAddServerModal] = useState(false)
  const [servers, setServers] = useState<any[]>([])

  const serversQuery = getUserServersQuery(userId as string, 0, 50)
  const { ref } = useInfiniteScroll(serversQuery)

  useEffect(() => {
    try {
      if (userId && serversQuery.isSuccess) {
        const newServers: any = []
        serversQuery.data.pages.forEach((page) => {
          newServers.push(...page.data)
        })
        setServers(newServers)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [serversQuery.data, userId])

  // Handle error state
  if (serversQuery.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (serversQuery.status === 'loading') {
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
        <div
          className={`mx-auto w-[calc(100%)] duration-150 hover:scale-125`}
          onClick={() => dispatch(setActiveServerId(null))}
        >
          <Link to="/">
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
                active={server.id === activeServerId ? true : false}
                clickHandler={(): void => {
                  if (joinedServer && joinedChannel && !pip) {
                    dispatch(togglePip())
                  }
                  dispatch(setActiveServerId(server.id))
                  dispatch(setActiveChannelId(null))
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
