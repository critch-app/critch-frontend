import { faGear, faPhone, faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Divider from '@renderer/components/Divider//Divider'

/**
 * Channel control component
 * @property {string} channelName - Active channel name
 * @returns {React.JSX.Element} renderer component.
 */
export default function ChannelControl({
  channelName
}: {
  channelName: string
}): React.JSX.Element {
  return (
    <>
      <div className={`flex items-center justify-between`}>
        <h1 className={`p-3 text-xl text-default-txt/75`}>
          <FontAwesomeIcon icon={faCirclePlay} className={`px-1`} />
          {channelName}
        </h1>

        <div className={`px-4 text-sm text-original-white`}>
          <button
            className={`mx-1 inline-flex h-7 w-7 items-center justify-center 
            rounded-full bg-soft-purble/70 p-2 duration-200 hover:rotate-180
          hover:bg-soft-purble/100`}
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
