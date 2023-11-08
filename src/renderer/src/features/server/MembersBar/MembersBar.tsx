import ServerTitle from './SubComponents/ServerTitle'
import ServerCover from '@renderer/assets/images/server-cover-test.svg'
import Member from './SubComponents/Member'
import UserAvatarTest from '@renderer/assets/images/user-icon-test.svg'
import React from 'react'

// dump data
const members = [
  { id: '1', userName: 'Abdullah Muhammed', avatar: UserAvatarTest },
  { id: '2', userName: 'Abdullah Muhammed', avatar: UserAvatarTest },
  { id: '3', userName: 'Abdullah Muhammed', avatar: UserAvatarTest },
  { id: '4', userName: 'Abdullah Muhammed', avatar: UserAvatarTest },
  { id: '5', userName: 'Abdullah Muhammed', avatar: UserAvatarTest },
  { id: '6', userName: 'Abdullah Muhammed', avatar: UserAvatarTest },
  { id: '7', userName: 'Abdullah Muhammed', avatar: UserAvatarTest },
  { id: '8', userName: 'Abdullah Muhammed', avatar: UserAvatarTest }
]

/**
 * @property none
 * @returns {MembersBar} @type React.JSX.Element
 * @description TThe server members bar component
 */
export default function MembersBar(): React.JSX.Element {
  return (
    <>
      <div className=" mx-1 my-auto h-[calc(100vh-2rem)] w-[calc(100vw/5.5)] rounded-lg">
        <ServerTitle name={'Critch Server'} cover={ServerCover} />
        <span className="mt-10 p-2 text-lg">Members</span>

        <div className="critch-overflow-hidden-scroll h-[calc(68%)] overflow-y-scroll">
          {members.map((member) => {
            return (
              <Member
                key={member.id}
                id={member.id}
                userName={member.userName}
                avatar={member.avatar}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
