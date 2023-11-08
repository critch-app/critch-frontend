import { useSelector, useDispatch } from 'react-redux'

import Divider from '../Divider/Divider'
import AppIcon from './SubComponents/AppIcon'
import ServerIcon from './SubComponents/ServerIcon'
import { RootState } from '@renderer/app/store'
import { setActiveServer } from './serverBarReducer'
import serverTestIcon from '@renderer/assets/images/server-icon-test.svg'
import React from 'react'

// dump data
const servers = [
  {
    server_id: '1',
    server_name: 'Server 1',
    photo: serverTestIcon
  },
  {
    server_id: '2',
    server_name: 'Server 2',
    photo: serverTestIcon
  },
  {
    server_id: '3',
    server_name: 'Server 3',
    photo: serverTestIcon
  },
  {
    server_id: '4',
    server_name: 'Server 4',
    photo: serverTestIcon
  },
  {
    server_id: '5',
    server_name: 'Server 5',
    photo: serverTestIcon
  }
]

/**
 * @properties none
 * @returns {ServerBar} @type React.JSX.Element
 * @description The server bar component
 */

export default function ServerBar(): React.JSX.Element {
  // Global State
  const activeServer = useSelector((state: RootState) => state.serverBar.activeServerID)
  const dispatch = useDispatch()

  // Component
  return (
    <>
      <div className="mb-0.5 ml-0.5 mr-1 mt-0.5 h-[calc(100vh-1rem)]  w-24 rounded-2xl bg-hard-white">
        <AppIcon />
        <Divider width={'w-[calc(100%-1rem)]'} bgColor={'bg-primary-gray'} />

        <div className="critch-overflow-hidden-scroll h-[calc(85%)] overflow-y-scroll ">
          {servers.map((server) => {
            return (
              <>
                <ServerIcon
                  key={server.server_id}
                  id={server.server_id}
                  name={server.server_name}
                  photo={server.photo}
                  active={server.server_id === activeServer ? true : false}
                  clickHandler={(): void => {
                    dispatch(setActiveServer(server.server_id))
                  }}
                />
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
