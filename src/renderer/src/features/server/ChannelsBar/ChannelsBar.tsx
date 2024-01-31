import UserCard from './SubComponents/UserCard'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { setActiveChannelId } from '../../../reducers/channelReducer'
import Channel from './SubComponents/Channel'
import ServerControl from './SubComponents/ChannelControl'
import { getServerChannelsQuery } from '@renderer/api/query/channels'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'
import { useEffect, useState } from 'react'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { getUserByIdQuery } from '@renderer/api/query/user'

export default function ChannelsBar(): React.JSX.Element {
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const userId = useSelector((state: RootState) => state.login.userId)
  const dispatch = useDispatch()
  const [apiError, setApiError] = useState('')
  const [channels, setChannels] = useState<any[]>([])
  const [user, setUser] = useState<any>({})
  const userQuery = getUserByIdQuery(userId as string)
  const channelQuery = getServerChannelsQuery(activeServerId as string, 0, 50)
  const { ref } = useInfiniteScroll(channelQuery)

  useEffect(() => {
    try {
      if (activeServerId && channelQuery.isSuccess && userQuery.isSuccess) {
        const newChannels: any = []
        channelQuery.data.pages.forEach((page) => {
          newChannels.push(...page.data)
        })
        setChannels(newChannels)
        setUser(userQuery.data.data)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [channelQuery.data, activeServerId, userQuery.data])

  // Handle error state
  if (channelQuery.status === 'error' || userQuery.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (channelQuery.status === 'loading' || userQuery.status === 'loading') {
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
                  active={channel.id === activeChannelId ? true : false}
                  clickHandler={(): void => {
                    dispatch(setActiveChannelId(channel.id))
                  }}
                />
              )
            })}
            <div ref={ref}></div>
          </div>
          <div className={`absolute bottom-1 left-1 h-fit w-fit`}>
            {userId && userQuery.data.data && (
              <UserCard userName={`${user.first_name} ${user.last_name}`} photo={user.photo} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
