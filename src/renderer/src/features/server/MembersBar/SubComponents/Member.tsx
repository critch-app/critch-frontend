/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Divider from '@renderer/components/Divider/Divider'
import React from 'react'

/**
 * Member card component
 * @property {any} id - Member id
 * @property {any} userName - Member name
 * @property {any} avatar - Member avatar
 * @returns {React.JSX.Element} renderer component.
 */
export default function Member({ id, userName, avatar }: any): React.JSX.Element {
  return (
    <>
      <div
        className={`my-1.5 flex w-[calc(90%)] cursor-pointer items-center justify-evenly rounded-lg p-1
         text-default-txt duration-150 hover:bg-hard-white`}
      >
        <img src={avatar} alt={`${userName}`} className={`h-8 w-8 rounded-full`} />
        <span className="text-sm">{userName}</span>
      </div>
      <Divider width={'w-[calc(100%-8rem)]'} bgColor={'bg-hard-white'} />
    </>
  )
}
