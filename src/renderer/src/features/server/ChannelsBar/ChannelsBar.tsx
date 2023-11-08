// import Channel from './SubComponents/Channel'
import UserCard from './SubComponents/UserCard'
import SearchBar from './SubComponents/SearchBar'
import UserAvatarTest from '@renderer/assets/images/user-icon-test.svg'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '@renderer/app/store'
import { setActiveChannel } from './channelsBarReducer'
import Channel from './SubComponents/Channel'

// dump data
const channels = [
  {
    channel_id: '1',
    name: 'General'
  },
  {
    channel_id: '2',
    name: 'Marketing'
  },
  {
    channel_id: '3',
    name: 'Development'
  },
  {
    channel_id: '4',
    name: 'Support'
  },
  {
    channel_id: '5',
    name: 'Random'
  }
]

/**
 * @property none
 * @returns {ChannelsBar} @type React.JSX.Element
 * @description The channels bar component
 */
export default function ChannelsBar(): React.JSX.Element {
  // Global State
  const activeChannel = useSelector((state: RootState) => state.channelsBar.channel)
  const dispatch = useDispatch()

  // Component
  return (
    <>
      <div className="relative mx-1 my-auto h-[calc(100vh-2rem)] w-[calc(100vw/5.5)] rounded-lg">
        <SearchBar />
        <div className=" h-[calc(85%)]">
          <div className="critch-overflow-hidden-scroll h-[calc(95%)] overflow-y-scroll ">
            {channels.map((channel) => {
              return (
                <Channel
                  key={channel.channel_id}
                  id={channel.channel_id}
                  name={channel.name}
                  active={channel.channel_id === activeChannel.channel_id ? true : false}
                  clickHandler={(): void => {
                    dispatch(setActiveChannel(channel))
                  }}
                />
              )
            })}
          </div>
          <div className="absolute bottom-1 left-1 h-fit w-fit">
            <UserCard id={'1'} userName={'Abdullah Muhammed'} avatar={UserAvatarTest} />
          </div>
        </div>
      </div>
    </>
  )
}
