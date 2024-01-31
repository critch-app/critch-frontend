import { clipboard, Notification } from 'electron'
import * as jwt from 'jsonwebtoken'

export const copyToClipboard = async (_, content: string): Promise<void> => {
  clipboard.writeText(content)
}

export const showNotification = async (_, title: string, body: string): Promise<void> => {
  new Notification({
    title: title,
    body: body,
    timeoutType: 'default'
  }).show()
}

export const generateInvitation = async (
  event,
  serverId: string,
  channels: string[]
): Promise<void> => {
  try {
    const token = await jwt.sign({ serverId, channels }, 'my-secret-key', {
      algorithm: 'HS256',
      expiresIn: 30 * 24 * 60 * 60
    })
    event.sender.send('token-generated', `critch-invitation://critch?token=${token}`)
  } catch (error: any) {
    event.sender.send('token-error')
  }
}
