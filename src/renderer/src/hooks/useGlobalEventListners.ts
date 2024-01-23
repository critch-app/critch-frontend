import { putServerMemberMut } from '@renderer/api/query/server' // Assuming this is accessible here
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'

export function useGlobalEventListeners(): { isError: boolean; error: string } {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const mut = putServerMemberMut(() => {})

  useEffect(() => {
    window.electron.ipcRenderer.on('add-me-to-server', async (_event, serverId) => {
      try {
        await mut.mutateAsync({ userId: loggedInUserId, serverId })
        setIsError(false)
        setError('')
      } catch (error) {
        setIsError(true)
        setError(
          `Couldn't join the server please make sure you are not already a member and try again`
        )
      }
    })
  })

  return { isError, error }
}
