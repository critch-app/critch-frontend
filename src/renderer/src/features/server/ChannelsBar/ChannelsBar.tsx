/* eslint-disable @typescript-eslint/no-explicit-any */
// import Channel from './SubComponents/Channel'
import UserCard from './SubComponents/UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { setActiveChannel } from './channelsBarReducer'
import Channel from './SubComponents/Channel'
import ServerControl from './SubComponents/ChannelControl'
import { getServerChannelsQuery } from '@renderer/api/query/channels'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'
import { useEffect, useState } from 'react'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { getUserByIdQuery } from '@renderer/api/query/user'

/**
 * Channels bar component
 * @returns {React.JSX.Element}
 */
export default function ChannelsBar(): React.JSX.Element {
  const activeChannel = useSelector((state: RootState) => state.channelsBar.channel)
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const dispatch = useDispatch()
  const [apiError, setApiError] = useState('')
  const [channels, setChannels] = useState<any[]>([])
  const userQuery = getUserByIdQuery(loggedInUserId)
  const query = getServerChannelsQuery(activeServer, 0, 50)
  const { ref } = useInfiniteScroll(query)

  useEffect(() => {
    try {
      if (activeServer && query.isSuccess) {
        const newChannels: any = []
        query.data.pages.forEach((page) => {
          newChannels.push(...page.data)
        })
        setChannels(newChannels)
      }
      console.log(userQuery.data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [query.data, activeServer])

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
      <div
        className={`relative mx-1 my-auto flex h-[calc(100vh-2rem)] w-[calc(100vw/5.5)] rounded-lg`}
      >
        <ServerControl />
        <div className={`h-[calc(85%)]`}>
          <div
            className={`critch-overflow-hidden-scroll h-[calc(95%)] w-[calc(100%)] overflow-y-scroll`}
          >
            {channels.map((channel) => {
              return (
                <Channel
                  key={channel.id}
                  id={channel.id}
                  name={channel.name}
                  active={channel.id === activeChannel?.id ? true : false}
                  clickHandler={(): void => {
                    dispatch(setActiveChannel(channel))
                  }}
                />
              )
            })}
            <div ref={ref}></div>
          </div>
          <div className={`absolute bottom-1 left-1 h-fit w-fit`}>
            {loggedInUserId && userQuery.data.data && (
              <UserCard
                userName={`${userQuery.data.data.first_name} ${userQuery.data.data.last_name}`}
                photo={userQuery.data.data.photo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
