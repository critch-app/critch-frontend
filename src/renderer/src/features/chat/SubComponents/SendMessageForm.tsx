import { faPaperPlane, faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

/**
 * @property none
 * @returns {SendMessage} @type React.JSX.Element
 * @description The messaging bar/form component
 */
export default function SendMessageForm(): React.JSX.Element {
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
            className={`
            absolute 
            bottom-4 
            left-[calc(50%)] 
            mx-auto 
            h-10 w-[calc(100%-2rem)] 
            translate-x-[calc(-50%)] 
            rounded-lg 
            border-2 border-solid border-hard-white/50 
            bg-soft-white p-5 
            focus:outline-primary-gray/75`}
            value={content}
            onChange={(ev): void => setContent(ev.target.value)}
          />
          <div
            className={` 
            absolute 
            bottom-6
            right-[calc(5%)]
            flex
            w-16
            justify-between 
            text-lg
            text-default-txt
            `}
          >
            <button type="button">
              <FontAwesomeIcon
                icon={faFaceSmileBeam}
                className="duration-150 hover:text-soft-purble"
              />
            </button>
            <button type="button">
              <FontAwesomeIcon icon={faPaperclip} className="duration-150 hover:text-soft-purble" />
            </button>
            <button
              type="button"
              onClick={(ev): void => {
                ev.preventDefault()
                setContent('')
              }}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="duration-150 hover:text-soft-purble"
              />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
