/* eslint-disable @typescript-eslint/no-explicit-any */
import ServerTitle from './SubComponents/ServerTitle'
import ServerCover from '@renderer/assets/images/server-cover-test.svg'
import Member from './SubComponents/Member'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { getServerByIDQuery, getServerMembersQuery } from '@renderer/api/query/server'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'

/**
 * Members bar componetn
 * @returns {React.JSX.Element} renderer component.
 */
export default function MembersBar(): React.JSX.Element {
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const query = getServerMembersQuery(activeServer, 0, 50)
  const serverQuery = getServerByIDQuery(activeServer)
  const [apiError, setApiError] = useState('')
  const [serverName, setServerName] = useState('')
  const [members, setMembers] = useState<any[]>([])
  const { ref } = useInfiniteScroll(query)

  useEffect(() => {
    try {
      if (activeServer) {
        const newMembers: any = []
        query.data.pages.forEach((page) => {
          newMembers.push(...page.data)
        })
        setServerName(serverQuery.data.data.name)
        setMembers(newMembers)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [query.data, activeServer])

  // Handle error state
  if (query.status === 'error' || serverQuery.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (query.status === 'loading' || serverQuery.status === 'loading') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  return (
    <>
      <div className={`mx-1 my-auto h-[calc(100vh-2rem)] w-[calc(100vw/5.5)] rounded-lg`}>
        <ServerTitle name={serverName} cover={ServerCover} />
        <span className={`mt-10 p-2 text-lg`}>Members</span>
        <div className={`critch-overflow-hidden-scroll h-[calc(68%)] overflow-y-scroll`}>
          {members.map((member) => {
            return (
              <Member
                key={member.id}
                id={member.id}
                userName={member.first_name + ' ' + member.last_name}
                avatar={member.photo}
              />
            )
          })}
          <div ref={ref}></div>
        </div>
      </div>
    </>
  )
}
