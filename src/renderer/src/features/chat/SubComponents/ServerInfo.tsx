import { getServerByIDQuery } from '@renderer/api/query/server'
import { RootState } from '@renderer/app/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import Divider from '@renderer/components/Divider/Divider'

export default function ServerInfo(): React.JSX.Element {
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const [apiError, setApiError] = useState('')
  const serverQuery = getServerByIDQuery(activeServerId as string)
  const [server, setServer] = useState<any | null>(null)

  useEffect(() => {
    try {
      if (activeServerId && serverQuery.isSuccess) {
        setServer(serverQuery.data.data)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [activeServerId, serverQuery.data])

  // Handle error state
  if (serverQuery.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (serverQuery.status === 'loading') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  return (
    <div
      className={`m-1 min-h-[calc(100vh-2rem)] w-[calc(100%-30rem)] rounded-lg bg-original-white`}
    >
      <div className=" flex min-h-full w-[calc(100%)] flex-col items-start justify-center">
        <div className="mx-4 my-4 flex items-center justify-center">
          <div className=" mx-4 inline-block rounded-full shadow-2xl shadow-secondry-gray">
            <img src={server?.photo} alt="" className="rounded-full" />
          </div>
          <span className="w-64 text-wrap break-words text-2xl">{server?.name}</span>
        </div>
        <Divider width="w-[calc(95%)]" bgColor="bg-primary-gray" />
        <div className="p-4">
          <span className="block w-full text-wrap break-words p-2 font-semibold">
            Descreption: {server?.description}
          </span>
          <span className="block p-2 font-semibold">Since: {server?.created_at.split('T')[0]}</span>
        </div>
      </div>
    </div>
  )
}
