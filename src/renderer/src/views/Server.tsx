import { useSelector } from 'react-redux'

import ChannelsBar from '@renderer/features/server/ChannelsBar/ChannelsBar'
import MembersBar from '@renderer/features/server/MembersBar/MembersBar'
import Channel from '@renderer/features/chat/Channel'
import { RootState } from '@renderer/app/store'
import ServerBar from '@renderer/features/server/ServerBar/ServerBar'
import ServerInfo from '@renderer/features/chat/SubComponents/ServerInfo'

export default function Server(): React.JSX.Element {
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  return (
    <>
      <ServerBar />
      <div
        className={`my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)] 
         justify-between rounded-2xl bg-soft-white`}
      >
        <ChannelsBar />
        {activeChannelId ? <Channel /> : <ServerInfo />}
        <MembersBar />
      </div>
    </>
  )
}
