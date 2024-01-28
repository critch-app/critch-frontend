/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteServerMemberMut, putServerMemberMut } from '@renderer/api/query/server'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { putChannelMemberMut } from '@renderer/api/query/channels'

export function useGlobalEventListeners(): { isError: boolean; error: string } {
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const loggedInUserToken = useSelector((state: RootState) => state.login.loggedInUserToken)
  const serverMemberMut = putServerMemberMut(() => {})
  const channelMemberMut = putChannelMemberMut(() => {})
  const deleteServerMember = deleteServerMemberMut(() => {})

  useEffect(() => {
    if (loggedInUserId && loggedInUserToken) {
      window.electron.ipcRenderer.on('add-me-to-server', async (_event, serverId, channels) => {
        try {
          await serverMemberMut.mutateAsync({ userId: loggedInUserId, serverId })
          setIsError(false)
          setError('')
        } catch (error) {
          setIsError(true)
          setError(
            `Couldn't join the server please make sure you are not already a member and try again`
          )
          return
        }

        try {
          await Promise.all(
            channels.map(async (channelId) => {
              try {
                await channelMemberMut.mutateAsync({ userId: loggedInUserId, channelId, serverId })
              } catch (error) {
                console.error(`Error adding to channel ${channelId}`, error)
              }
            })
          )
          setIsError(false)
          setError('')
        } catch (error) {
          await deleteServerMember.mutateAsync({ userId: loggedInUserId, serverId })
          setIsError(true)
          setError(`There is a problem in channel member addition please try again later`)
          return
        }
      })
    }
  }, [loggedInUserId, loggedInUserToken])

  return { isError, error }
}
