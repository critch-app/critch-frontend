import { putServerMemberMut } from '@renderer/api/query/server'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { putChannelMemberMut } from '@renderer/api/query/channels'
export function useGlobalEventListeners(): { isError: boolean; error: string } {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const userId = useSelector((state: RootState) => state.login.userId)
  const userToken = useSelector((state: RootState) => state.login.userToken)
  const serverMemberMut = putServerMemberMut(() => {})
  const channelMemberMut = putChannelMemberMut(() => {})

  useEffect(() => {
    if (userId && userToken) {
      window.electron.ipcRenderer.on('add-me-to-server', async (_event, serverId, channels) => {
        setIsError(false)
        setError('')

        try {
          await serverMemberMut.mutateAsync({ userId: userId, serverId })
        } catch (serverError: any) {
          // Ignore server addition error
        }

        try {
          const channelPromises = channels.map(async (channelId: string) => {
            try {
              await channelMemberMut.mutateAsync({
                userId: userId,
                channelId,
                serverId
              })
            } catch (channelError) {
              // Ignore errors for individual channels
            }
          })
          await Promise.allSettled(channelPromises)

          const failedChannelAdditions = channelPromises.filter((p) => p.status === 'rejected')
          if (failedChannelAdditions.length === channels.length) {
            setIsError(true)
            setError('Failed to add user to the server or the channels')
          }
        } catch (error: any) {
          setIsError(true)
          setError(error.message)
        }
      })
    }
  }, [userId, userToken])

  return { isError, error }
}
