import ServerBar from '@renderer/features/server/ServerBar/ServerBar'
import { useNavigate } from 'react-router-dom'
import UserBar from './../features/home/UserBar'
import { useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { useEffect } from 'react'
import AppIcon from '@renderer/components/AppIcon/AppIcon'
import { useMessaging } from '@renderer/hooks/useMessaging'

/**
 * Component representing the home/DM view.
 * @returns {React.JSX.Element} rendered component.
 */
export default function Home(): React.JSX.Element {
  const navigate = useNavigate()
  useMessaging(null)
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const loggedInUserToken = useSelector((state: RootState) => state.login.loggedInUserToken)

  useEffect(() => {
    if (!loggedInUserId || !loggedInUserToken) {
      navigate('/login')
    }
  })

  return (
    <>
      {loggedInUserId && <ServerBar />}
      <div
        className={`my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)]
          items-center justify-center rounded-2xl bg-soft-white`}
      >
        <div className={`animate-pulse duration-700`}>
          <AppIcon width={`w-96`} height={`w-96`} />
        </div>
        <h1 className={`text-4xl text-default-txt`}>Critch DMs Are Comming Soon!</h1>
      </div>
      {loggedInUserId && <UserBar />}
    </>
  )
}
