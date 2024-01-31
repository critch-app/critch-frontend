import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { getServerChannelsQuery } from '@renderer/api/query/channels'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'

export default function AddMembers(): React.JSX.Element {
  const [invitation, setInvitation] = useState(null as string | null)
  const [isLinkReady, setIsLinkReady] = useState(false)
  const [isLinkError, setIsLinkError] = useState(false)
  const [apiError, setApiError] = useState('')
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const channelsQuery = getServerChannelsQuery(activeServerId as string, 0, 50)
  const [channels, setChannels] = useState<any>([])
  const [selectedChannels, setSelectedChannels] = useState<any>([])
  const { ref } = useInfiniteScroll(channelsQuery)

  useEffect(() => {
    try {
      if (activeServerId && channelsQuery.isSuccess) {
        const newChannels: any = []
        channelsQuery.data.pages.forEach((page) => {
          newChannels.push(...page.data)
        })
        setChannels(newChannels)
        console.log(selectedChannels.length)
        console.log(channels.length)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [channelsQuery.data, activeServerId])

  // Handle error state
  if (channelsQuery.status === 'error' || (isLinkError && !isLinkReady)) {
    return <Error error={apiError || "Couldn't genertae invitation link"} reset={null} />
  }

  // Handle loading state
  if (channels.status === 'loading') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  window.electron.ipcRenderer.on('token-generated', async (_event, url: string) => {
    setInvitation(url)
    setIsLinkReady(true)
  })

  window.electron.ipcRenderer.on('token-error', async () => {
    setIsLinkReady(false)
    setIsLinkError(true)
  })

  return (
    <div className={`h-[calc(100%)] w-[calc(78%)]  rounded-lg bg-original-white p-5`}>
      <h1 className={`px-3 py-3 text-3xl`}>Add Members</h1>
      <p className={`px-3 py-1`}>Copy this link and shre it to make people join your server</p>
      <p className={`px-3 py-1`}>This Link is valid for 30 days</p>
      <div className={`h-[calc(100%)]`}>
        <h3
          className={`h-12 w-[calc(70%)] overflow-clip 
        overflow-ellipsis whitespace-nowrap rounded-md bg-primary-gray p-2 text-default-txt`}
        >
          {invitation || '----'}
        </h3>
        <button
          className={`mx-auto my-1 rounded-md bg-soft-purble p-1.5 text-sm
          text-original-white hover:bg-soft-purble/80`}
          onClick={async (): Promise<void> => {
            if (!invitation) {
              Promise.reject
              return
            } else {
              await window.api.writeToClipboard(invitation)
              await window.api.showNotifications(
                'Invitation link copied to your clipboard',
                invitation
              )
            }
          }}
          disabled={!invitation || selectedChannels.length === 0 || channels.length === 0}
        >
          Copy
        </button>
        <button
          className={`mx-auto my-1 rounded-md bg-soft-purble p-1.5 text-sm
        text-original-white hover:bg-soft-purble/80`}
          onClick={async (): Promise<void> => {
            await window.api.generateInvitation(activeServerId as string, selectedChannels)
            setIsLinkReady(true)
          }}
          disabled={selectedChannels.length === 0 || channels.length === 0}
        >
          Generate
        </button>

        <div
          className={`critch-overflow-hidden-scroll h-[calc(95%)] w-[calc(100%)] overflow-y-scroll`}
        >
          {channels.length > 0 ? (
            channels.map((channel) => {
              return (
                <div key={channel.id} id={channel.id}>
                  <p>{channel.name}</p>
                  <input
                    type="checkbox"
                    onChange={(): void => {
                      setSelectedChannels((prevChannels) =>
                        prevChannels.includes(channel.id)
                          ? prevChannels.filter((id) => id !== channel.id)
                          : [...prevChannels, channel.id]
                      )
                      console.log(selectedChannels)
                    }}
                  ></input>
                </div>
              )
            })
          ) : (
            <p>You need to add channels before generating invitations</p>
          )}
          <div ref={ref}></div>
        </div>
      </div>
    </div>
  )
}
