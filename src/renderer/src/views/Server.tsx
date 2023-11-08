import ChannelsBar from '@renderer/features/server/ChannelsBar/ChannelsBar'
import MembersBar from '@renderer/features/server/MembersBar/MembersBar'
import Chat from '@renderer/features/chat/Chat'
import { useParams, Route, Routes } from 'react-router-dom'
export default function Server(): JSX.Element {
  const { id } = useParams()
  if (id) {
    return (
      <div className="my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)]  justify-between rounded-2xl bg-soft-white">
        <ChannelsBar />
        <Routes>
          <Route path="channel/:id" element={<Chat />} />
        </Routes>
        <MembersBar />
      </div>
    )
  }
  return (
    <div className="my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)]  justify-between rounded-2xl bg-soft-white"></div>
  )
}
