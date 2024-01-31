import Divider from '@renderer/components/Divider/Divider'
import React from 'react'

export default function Member({ userName, avatar }: any): React.JSX.Element {
  return (
    <>
      <div
        className={`my-1.5 flex w-[calc(95%)] cursor-pointer items-center justify-start rounded-lg p-1
         text-default-txt duration-150 hover:bg-hard-white`}
      >
        <img src={avatar} alt={`${userName}`} className={`h-8 w-8 rounded-full`} />
        <span className="mx-1 text-sm">{userName}</span>
      </div>
      <Divider width={'w-[calc(100%-8rem)]'} bgColor={'bg-hard-white'} />
    </>
  )
}
