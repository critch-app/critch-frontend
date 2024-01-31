export default function Message({
  senderAvatar,
  senderUsername,
  content,
  mine,
  sentAt
}: {
  senderAvatar: string
  senderUsername: string
  content: string
  mine: boolean
  sentAt: string
}): React.JSX.Element {
  return (
    <div className={`m-4 flex p-2 ${mine ? 'justify-end' : ''}`}>
      {!mine ? (
        <img src={senderAvatar} alt={`${senderUsername} Avatar`} className="mx-2 h-7 w-7" />
      ) : null}

      <div
        className={`relative h-fit w-80 rounded-md p-2 text-[calc(0.8rem)] ${
          mine ? 'bg-soft-purble  text-soft-white' : 'bg-soft-white text-default-txt'
        }`}
      >
        {content}

        <span
          className={`absolute -bottom-5 text-[calc(0.6rem)] ${
            mine ? 'left-1' : 'right-1'
          } text-xs text-primary-gray/90`}
        >
          {senderUsername} , {sentAt}
        </span>
      </div>

      {mine ? (
        <img src={senderAvatar} alt={`${senderUsername} Avatar`} className={`mx-2 h-7 w-7`} />
      ) : null}
    </div>
  )
}
