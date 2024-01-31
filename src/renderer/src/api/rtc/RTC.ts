import { EventType } from '@renderer/env.d'
import WS from '../ws/ws'

class RTC {
  private stunServerUrl: string = 'stun:stun1.l.google.com:19302'
  private peerConnection: RTCPeerConnection
  private dataChannel!: RTCDataChannel

  constructor(ws: WS, channelId: string, userId: string) {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: this.stunServerUrl }]
    })
    this.connectToSFU(ws, channelId, userId)
  }

  private async createOffer(): Promise<RTCSessionDescriptionInit> {
    const offer = await this.peerConnection.createOffer()
    await this.peerConnection.setLocalDescription(offer)
    return offer
  }

  private async connectToSFU(ws: WS, channelId: string, userId: string): Promise<void> {
    const offer = await this.createOffer()
    ws.sendMessage(
      JSON.stringify({
        offer: offer,
        channel_id: channelId,
        user_id: userId,
        type: EventType.RTC_OFFER
      })
    )

    const response = new Promise<{ answer: RTCSessionDescriptionInit; type: EventType }>(
      (resolve) => {
        ws.onMessage((event: MessageEvent) => {
          resolve(JSON.parse(event.data) as { answer: RTCSessionDescriptionInit; type: EventType })
        }, EventType.RTC_ANSWER)
      }
    )

    const answer = (await response).answer
    const answerDescription = new RTCSessionDescription(answer)
    await this.peerConnection.setRemoteDescription(answerDescription)
    this.dataChannel = this.peerConnection.createDataChannel('channel')
  }

  async sendStream(mediaStream: MediaStream, channelId: string, userId: string): Promise<void> {
    if (this.dataChannel.readyState !== 'open') {
      throw new Error('Data channel is not open.')
    }
    try {
      this.dataChannel.send(JSON.stringify({ channel_id: channelId, user_id: userId }))
      for await (const track of mediaStream.getTracks()) {
        this.peerConnection.addTrack(track)
      }
    } catch (error) {
      console.error('Error adding tracks to peer connection:', error)
    }
  }

  setOnTrackHandler(handler: (event: RTCTrackEvent) => void): void {
    this.peerConnection.ontrack = handler
  }

  setOnMessageHandler(handler: (event: MessageEvent) => void): void {
    this.dataChannel.onmessage = handler
  }
}

export default RTC
