import { faGear, faPhone, faEarthAmerica } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RootState } from '@renderer/app/store'
import Divider from '@renderer/components/Divider//Divider'
import { joinMeeting } from '@renderer/reducers/meetingReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function ChannelControl({
  channelName,
  channelId
}: {
  channelName: string
  channelId: string
}): React.JSX.Element {
  const serverId = useSelector((state: RootState) => state.server.id)

  const dispatch = useDispatch()
  return (
    <>
      <div className={`flex items-center justify-between`}>
        <h1 className={`p-3 text-xl text-default-txt/75`}>
          <FontAwesomeIcon icon={faEarthAmerica} className={`px-1`} />
          {channelName}
        </h1>

        <div className={`px-4 text-sm text-original-white`}>
          <button
            className={`mx-1 inline-flex h-7 w-7 items-center justify-center 
            rounded-full bg-soft-purble/70 p-2 duration-200 hover:rotate-180
          hover:bg-soft-purble/100`}
            onClick={async (): Promise<void> => {
              dispatch(joinMeeting({ channelId, serverId: serverId as string }))
            }}
          >
            <FontAwesomeIcon icon={faPhone} />
          </button>

          <button
            className={`mx-1 inline-flex h-7 w-7 items-center justify-center 
            rounded-full bg-soft-purble/70 p-2 duration-200 hover:rotate-180
          hover:bg-soft-purble/100`}
          >
            <FontAwesomeIcon icon={faGear} />
          </button>
        </div>
      </div>
      <Divider width={'w-[calc(100%-2rem)]'} bgColor={'bg-hard-white'} />
    </>
  )
}
