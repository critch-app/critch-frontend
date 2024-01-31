import React from 'react'

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
