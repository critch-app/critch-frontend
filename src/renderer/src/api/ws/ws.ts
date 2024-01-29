import { EventType } from '@renderer/env.d'

class WS {
  private handlers: Map<EventType, (event: MessageEvent) => void> = new Map()
  private socket: WebSocket
  private token: string

  public constructor(token: string) {
    this.token = token
    this.socket = new WebSocket(`ws://localhost:8080/v1/messaging-service?token=${this.token}`)
    this.socket.addEventListener('message', (event: MessageEvent) => {
      this.handleMessage(event)
    })
  }

  private handleMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data)
    const handler = this.handlers.get(data.type)
    if (handler) {
      handler(event)
    } else {
      console.warn('Unhandled event type:', data.type)
    }
  }

  public onMessage(handler: (event: MessageEvent) => void, eventType: EventType): void {
    this.handlers.set(eventType, handler)
  }

  public onOpen(handler: () => void): void {
    this.socket.addEventListener('open', handler)
  }

  public onClose(handler: () => void): void {
    this.socket.addEventListener('close', handler)
  }

  public onError(handler: (errorEvent: Event) => void): void {
    this.socket.addEventListener('error', (errorEvent) => {
      handler(errorEvent)
    })
  }

  public sendMessage(message: string): void {
    this.socket.send(message)
  }

  public removeEventListener(eventType: EventType): void {
    this.handlers.delete(eventType)
  }
}

export default WS
