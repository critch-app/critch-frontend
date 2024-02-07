import Member from './SubComponents/Member'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { getServerMembersQuery } from '@renderer/api/query/server'
import Loading from '@renderer/components/Loading/Loading'
import Error from '@renderer/components/Error/Error'
import { useInfiniteScroll } from '@renderer/hooks/useInfiniteScroll'
import Divider from '@renderer/components/Divider/Divider'

export default function MembersBar(): React.JSX.Element {
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const mambersQuery = getServerMembersQuery(activeServerId as string, 0, 50)
  const [apiError, setApiError] = useState('')
  const [members, setMembers] = useState<any[]>([])
  const { ref } = useInfiniteScroll(mambersQuery)

  useEffect(() => {
    try {
      if (activeServerId && mambersQuery.isSuccess) {
        const newMembers: any = []
        mambersQuery.data.pages.forEach((page) => {
          newMembers.push(...page.data)
        })

        setMembers(newMembers)
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError('An unexpected error occurred')
      }
    }
  }, [mambersQuery.data, activeServerId])

  // Handle error state
  if (mambersQuery.status === 'error') {
    return <Error error={apiError} reset={null} />
  }

  // Handle loading state
  if (mambersQuery.status === 'loading') {
    return (
      <div>
        <Loading size={170} />
      </div>
    )
  }

  return (
    <>
      <div className={`mx-1 my-2 h-[calc(100vh-2rem)] w-[calc(100vw/6.5)] rounded-lg py-1`}>
        <span className={`my-5 p-2 text-xl`}>Members</span>
        <Divider width="w-[calc(95%)]" bgColor="bg-primary-gray" />
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
