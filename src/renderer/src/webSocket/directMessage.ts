/* eslint-disable prettier/prettier */
import useWebSocket from 'react-use-websocket'

const baseWsUrl = 'ws://localhost:8080'

const wsUrl = `${baseWsUrl}/v1/messaging-service`

const createDirectMessageSocket = (): ((channelId: string, content: string) => void) => {
  const { sendJsonMessage } = useWebSocket(wsUrl, {
    queryParams: {}
  })

  return (channelId: string, content: string) => {
    if (sendJsonMessage) {
      sendJsonMessage({ channelId, content })
    }
  }
}

export default createDirectMessageSocket
