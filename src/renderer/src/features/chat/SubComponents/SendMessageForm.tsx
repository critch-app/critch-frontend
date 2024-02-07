import { faPaperPlane, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RootState } from '@renderer/app/store'
import { EventType } from '@renderer/env.d'
import { useWebSocketProvider } from '@renderer/hooks/useWebSocketProvider'
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'

export default function SendMessageForm(): React.JSX.Element {
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const userId = useSelector((state: RootState) => state.login.userId)
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  const socket = useContext(useWebSocketProvider())
  const [content, setContent] = useState('')
  const [emojiActive, setEmojiActive] = useState<boolean>(false)

  return (
    <>
      <div>
        <form>
          <textarea
            name="message"
            id="message"
            placeholder="Send Message"
            value={content}
            onChange={(ev): void => setContent(ev.target.value)}
            className={`focus:outline-primary-gray/7 critch-overflow-hidden-scroll absolute bottom-4 left-[calc(45%)] 
            max-h-11 w-[calc(100%-5rem)] translate-x-[calc(-50%)] resize-none overflow-y-scroll 
            rounded-lg border-2 border-solid border-hard-white/50 bg-soft-white p-2 focus:outline-none`}
          />
          <div
            className={`absolute bottom-6 right-[calc(1%)] flex w-16 justify-between text-lg text-default-txt`}
          >
            <button
              type="button"
              onClick={() => {
                setEmojiActive(!emojiActive)
              }}
            >
              <FontAwesomeIcon
                icon={faFaceSmileBeam}
                className={`duration-150 hover:text-soft-purble`}
              />
            </button>
            {emojiActive && (
              <div className={`absolute bottom-10 right-1/2`}>
                <EmojiPicker
                  emojiStyle={EmojiStyle.FACEBOOK}
                  lazyLoadEmojis={true}
                  onEmojiClick={(emojiData: EmojiClickData) => {
                    setContent(content + emojiData.emoji)
                  }}
                />
              </div>
            )}
            <button type="button">
              <FontAwesomeIcon
                icon={faPaperclip}
                className={`duration-150 hover:text-soft-purble`}
              />
            </button>
            <button
              disabled={!content}
              onClick={(ev): void => {
                ev.preventDefault()
                if (socket) {
                  const message = JSON.stringify({
                    type: EventType.MESSAGE,
                    data: {
                      sender_id: userId,
                      server_id: activeServerId,
                      channel_id: activeChannelId,
                      content
                    }
                  })
                  socket.sendMessage(message)
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
