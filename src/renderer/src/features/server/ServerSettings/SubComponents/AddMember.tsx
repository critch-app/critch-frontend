//import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import Divider from '@renderer/components/Divider/Divider'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'

export default function AddMembers(): React.JSX.Element {
  const [invitation, setInvitation] = useState(null as string | null)
  const [isLinkReady, setIsLinkReady] = useState(false)
  const [isLinkError, setIsLinkError] = useState(false)
  const serverID = useSelector((state: RootState) => state.serverBar.activeServerID)

  window.electron.ipcRenderer.on('token-generated', async (_event, url: string) => {
    setInvitation(url)
    setIsLinkReady(true)
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  window.electron.ipcRenderer.on('token-error', async (_event, _error: Error) => {
    setIsLinkReady(false)
    setIsLinkError(true)
  })

  useEffect(() => {
    if (!invitation) {
      const generateInvitation = async (): Promise<void> => {
        await window.api.generateInvitation(serverID)
      }
      generateInvitation()
    } else {
      setIsLinkReady(true)
    }
  }, [])

  if (isLinkError && !isLinkReady) {
    return (
      <div>
        <Error
          error={`Couldn't generate invatation link please try again latter or restart the applicataion`}
        />
      </div>
    )
  }

  if (!isLinkReady) {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

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
          {invitation}
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
        >
          Copy
        </button>
      </div>
    </div>
  )
}
