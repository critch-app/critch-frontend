import { faPaperPlane, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WS from '@renderer/api/ws/ws'
import { RootState } from '@renderer/app/store'
import { useWebSocketProvider } from '@renderer/hooks/useWebSocketProvider'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'

/**
 * Send Message Input
 * @returns {React.JSX.Element} renderer component.
 */
export default function SendMessageForm(): React.JSX.Element {
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const loggedInUserToken = useSelector((state: RootState) => state.login.loggedInUserToken)
  const loggedInUserId = useSelector((state: RootState) => state.login.loggedInUserID)
  const activeChannel = useSelector((state: RootState) => state.channelsBar.channel)
  const socket = useContext(useWebSocketProvider())
  const [content, setContent] = useState('')
  return (
    <>
      <div>
        <form>
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Send Message"
            value={content}
            onChange={(ev): void => setContent(ev.target.value)}
            className={`absolute bottom-4 left-[calc(50%)] mx-auto h-10 w-[calc(100%-2rem)] 
            translate-x-[calc(-50%)] rounded-lg border-2 border-solid border-hard-white/50 
            bg-soft-white p-5 focus:outline-primary-gray/75`}
          />
          <div
            className={`absolute bottom-6 right-[calc(5%)] flex w-16 justify-between text-lg text-default-txt`}
          >
            <button type="button">
              <FontAwesomeIcon
                icon={faFaceSmileBeam}
                className={`duration-150 hover:text-soft-purble`}
              />
            </button>
            <button type="button">
              <FontAwesomeIcon
                icon={faPaperclip}
                className={`duration-150 hover:text-soft-purble`}
              />
            </button>
            <button
              onClick={async (ev): Promise<void> => {
                ev.preventDefault()
                if (socket) {
                  socket.sendMessage(
                    JSON.stringify({
                      sender_id: loggedInUserId,
                      server_id: activeServer,
                      channel_id: activeChannel.id,
                      content,
                      attatchment: 'none'
                    })
                  )
                }
                setContent('')
              }}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className={`duration-150 hover:text-soft-purble`}
              />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
