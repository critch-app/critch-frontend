import { useParams, Route, Routes } from 'react-router-dom'

import ChannelsBar from '@renderer/features/server/ChannelsBar/ChannelsBar'
import MembersBar from '@renderer/features/server/MembersBar/MembersBar'
import Chat from '@renderer/features/chat/Chat'
import ServerBar from '@renderer/components/ServerBar/ServerBar'

/**
 * Component representing the server view.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */
export default function Server(): React.JSX.Element {
  const { id } = useParams()
  if (id) {
    return (
      <>
        <ServerBar />
        <div className="my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)]  justify-between rounded-2xl bg-soft-white">
          <ChannelsBar />
          <Routes>
            <Route path="channel/:id" element={<Chat />} />
          </Routes>
          <MembersBar />
        </div>
      </>
    )
  }
  //TODO: later will navigate to dm to avoid errors if there is no server id
  return (
    <div className="my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)]  justify-between rounded-2xl bg-soft-white"></div>
  )
}
