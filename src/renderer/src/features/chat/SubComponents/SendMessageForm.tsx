import { faPaperPlane, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons'
import { faPaperclip, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RootState } from '@renderer/app/store'
import Modal from '@renderer/components/Modal/Modal'
import { EventType } from '@renderer/env.d'
import { useWebSocketProvider } from '@renderer/hooks/useWebSocketProvider'
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { PickerInline } from 'filestack-react'

export default function SendMessageForm(): React.JSX.Element {
  const activeServerId = useSelector((state: RootState) => state.server.id)
  const userId = useSelector((state: RootState) => state.login.userId)
  const activeChannelId = useSelector((state: RootState) => state.channel.id)
  const API_KEY = useSelector((state: RootState) => state.fileStack.API_KEY)
  const socket = useContext(useWebSocketProvider())
  const [content, setContent] = useState('')
  const [emojiActive, setEmojiActive] = useState<boolean>(false)
  const [pickerState, setPickerState] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const pickerOptions = {
    accept: ['image/*'],
    disableTransformer: true,
    maxFiles: 1,
    minFiles: 1
  }

  return (
    <>
      {pickerState && (
        <Modal>
          <button
            onClick={(): void => {
              setPickerState(false)
            }}
            className={`absolute right-96 top-20 rounded-lg bg-soft-white p-3 text-lg text-default-txt hover:text-soft-purble`}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <PickerInline
            apikey={API_KEY}
            pickerOptions={pickerOptions}
            onUploadDone={(res: any) => {
              setUrl(res.filesUploaded[0].url)
              setPickerState(false)
            }}
          />
        </Modal>
      )}
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
            <button
              type="button"
              onClick={() => {
                setPickerState(true)
              }}
            >
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
                      content,
                      attachment: url
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
