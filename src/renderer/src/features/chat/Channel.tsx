import React from 'react'
import { useParams } from 'react-router-dom'
import Chat from './SubComponents/Chat'
import ServerInfo from './SubComponents/ServerInfo'

/**
 * Channel Component
 * @returns {React.JSX.Element} renderer component
 */
export default function Channel(): React.JSX.Element {
  const { id } = useParams()
  if (id) {
    return <Chat />
  } else {
    return <ServerInfo />
  }
}
