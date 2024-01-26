/* eslint-disable prettier/prettier */
import useWebSocket, { ReadyState } from 'react-use-websocket'

const baseWsUrl = 'ws://localhost:8080'

const wsUrl = `${baseWsUrl}/v1/messaging-service`

const createServerMessageSocket = (): {
  sendMessage: (channelId: string, content: string, serverId: string) => void
  closeConnection: () => void
} => {
  const { sendJsonMessage, readyState } = useWebSocket(wsUrl)

  const sendMessage = (channelId: string, content: string, serverId: string): void => {
    if (sendJsonMessage) {
      sendJsonMessage({ type: 'serverMessage', channelId, content, serverId })
    }
  }

  const closeConnection = (): void => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ type: 'disconnect' })
    }
  }

  return { sendMessage, closeConnection }
}

export default createServerMessageSocket
