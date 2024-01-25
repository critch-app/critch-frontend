/* eslint-disable prettier/prettier */
import useWebSocket from 'react-use-websocket'

const baseWsUrl = 'ws://localhost:8080'

const wsUrl = `${baseWsUrl}/v1/messaging-service`

const handleServerMessageSocket = (): ((
  channelId: string,
  content: string,
  serverId: string
) => void) => {
  const { sendJsonMessage } = useWebSocket(wsUrl, {
    queryParams: {}
  })

  return (channelId: string, content: string, serverId: string) => {
    if (sendJsonMessage) {
      sendJsonMessage({ channelId, content, serverId })
    }
  }
}

export default handleServerMessageSocket
