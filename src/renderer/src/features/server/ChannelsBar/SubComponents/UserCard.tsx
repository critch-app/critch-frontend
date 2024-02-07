import React from 'react'

export default function UserCard({ userName, photo }: any): React.JSX.Element {
  return (
    <div className={` backdrop-blur-md`}>
      <div
        className={`mx-auto flex h-12 w-60 items-center rounded-lg bg-gradient-to-r from-hard-purble to-soft-purble`}
      >
        <img src={photo} alt="user avatar" className={`h-12 w-14 rounded-full p-1`} />

        <div
          className={`relative flex w-full flex-nowrap items-center justify-between  text-soft-white`}
        >
          <span className="font-medium">{userName}</span>
        </div>
      </div>
    </div>
  )
}
