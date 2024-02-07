import React from 'react'

export default function Member({ userName, avatar }: any): React.JSX.Element {
  return (
    <>
      <div
        className={`my-1.5 flex w-[calc(95%)] cursor-pointer items-center justify-start rounded-lg bg-hard-white
         p-1 text-default-txt duration-200 hover:bg-primary-gray`}
      >
        <img src={avatar} alt={`${userName}`} className={`h-8 w-8 rounded-full`} />
        <span className="mx-1 overflow-hidden overflow-ellipsis text-sm">{userName}</span>
      </div>
    </>
  )
}
