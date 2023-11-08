/* eslint-disable @typescript-eslint/no-explicit-any */
import Divider from '@renderer/components/Divider/Divider'
import React from 'react'

/**
 * @property {id} @type any
 * @property {userName} @type any
 * @property {avatar} @type any
 * @returns {Member} @type React.JSX.Element
 * @description The member card component
 * @todo types didn't specified yet
 */
export default function Member({ id, userName, avatar }: any): React.JSX.Element {
  console.log(id)
  return (
    <>
      <div className="my-1.5 flex w-[calc(90%)] cursor-pointer items-center justify-evenly rounded-lg p-1 text-default-txt duration-150 hover:bg-hard-white">
        <img src={avatar} alt={`${userName}`} className=" h-8 w-8 rounded-full" />
        <span className="text-sm">{userName}</span>
      </div>
      <Divider width={'w-[calc(100%-8rem)]'} bgColor={'bg-hard-white'} />
    </>
  )
}
