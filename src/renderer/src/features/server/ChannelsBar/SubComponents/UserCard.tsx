/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

/**
 * User card component
 * @property {any} id - logged user id
 * @property {any} userName - logged user name
 * @property {any} avatar - logged user avatar
 * @returns {React.JSX.Element} renderer component.
 */
export default function UserCard({ userName, photo }: any): React.JSX.Element {
  return (
    <>
      <div
        className={`mx-auto flex h-14 w-60 items-center rounded-lg bg-gradient-to-r 
        from-hard-purble to-soft-purble`}
      >
        <img src={photo} alt="user avatar" className={`h-12 w-12 rounded-full p-1`} />

        <div className={`flex w-full flex-nowrap items-center justify-between text-soft-white`}>
          <span className="font-medium">{userName}</span>
        </div>
      </div>
    </>
  )
}
