/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

/**
 * @property {id} @type any
 * @property {userName} @type any
 * @property {avatar} @type any
 * @returns {UserCard} @type React.JSX.Element
 * @description The user card component
 * @todo types didn't specified yet
 */
export default function UserCard({ id, userName, avatar }: any): React.JSX.Element {
  console.log(id)
  return (
    <>
      <div className="mx-auto flex h-14 w-60 items-center rounded-lg bg-gradient-to-r from-hard-purble to-soft-purble">
        <img src={avatar} alt="user avatar" className=" h-12 w-12 rounded-full p-1" />

        <div className="flex w-full flex-nowrap items-center justify-between text-soft-white">
          <span className="font-medium">{userName}</span>
          <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer p-2 text-lg" />
        </div>
      </div>
    </>
  )
}
