import Message from './Message'
import UserTestIcon from '@renderer/assets/images/user-icon-test.svg'
import { useRef, useEffect } from 'react'
import { scrollToBottom } from '@renderer/util/helpers'

// Dump Data
const messages = [
  {
    id: 1,
    sender: 'John',
    content: 'Hello there!',
    mine: false
  },
  {
    id: 2,
    sender: 'Alice',
    content: 'Hi John!',
    mine: false
  },
  {
    id: 3,
    sender: 'Bob',
    content: 'Good morning!',
    mine: false
  },
  {
    id: 4,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  },
  {
    id: 5,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  },
  {
    id: 6,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  },
  {
    id: 7,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  },
  {
    id: 8,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  },
  {
    id: 9,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  },
  {
    id: 10,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  },
  {
    id: 11,
    sender: 'Abdullah',
    content: 'This is an unknown sender.',
    mine: true
  }
]

/**
 * Messages Container Component
 * @returns {React.JSX.Element} renderer component.
 */
export default function Messages(): React.JSX.Element {
  const chatWindowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    scrollToBottom(chatWindowRef)
  }, [])

  return (
    <div
      ref={chatWindowRef}
      className={`critch-overflow-hidden-scroll h-[calc(80vh)] w-[calc(100%)] overflow-y-scroll`}
    >
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            sentAt={'8:30 AM'}
            mine={message.mine}
            senderAvatar={UserTestIcon}
            senderUsername={message.sender ?? 'unknown'}
            content={message.content}
          />
        )
      })}
    </div>
  )
}
