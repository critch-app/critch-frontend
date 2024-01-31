import ServerBar from '@renderer/features/server/ServerBar/ServerBar'
import { useNavigate } from 'react-router-dom'
import UserBar from './../features/home/UserBar'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { useEffect } from 'react'
import AppIcon from '@renderer/components/AppIcon/AppIcon'
import { useMessaging } from '@renderer/hooks/useMessaging'

export default function Home(): React.JSX.Element {
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.login.userId)
  const userToken = useSelector((state: RootState) => state.login.userToken)
  useMessaging(null)
  useEffect(() => {
    if (!userId || !userToken) {
      navigate('/login')
    }
  })
  return (
    <>
      {userId && userToken && (
        <>
          <ServerBar />
          <div
            className={`my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)]
        items-center justify-center rounded-2xl bg-soft-white`}
          >
            <div className={`animate-pulse duration-700`}>
              <AppIcon width={`w-96`} height={`w-96`} />
            </div>
            <h1 className={`text-4xl text-default-txt`}>Critch DMs Are Comming Soon!</h1>
          </div>
          <UserBar />
        </>
      )}
    </>
  )
}
