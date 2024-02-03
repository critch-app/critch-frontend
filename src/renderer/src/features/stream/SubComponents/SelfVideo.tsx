import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RootState } from '@renderer/app/store'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { LocalStream, Client } from 'ion-sdk-js'
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl'
import { useGlobalPipProvider } from '@renderer/hooks/useGlobalPipProvider'
export default function SelfVideo({
  client,
  signal
}: {
  client: Client | null
  signal: IonSFUJSONRPCSignal | null
}): React.JSX.Element {
  const myVideoRef = useRef<HTMLVideoElement | null>(null)
  const isAudio = useSelector((state: RootState) => state.meeting.isAudio)
  const isVideo = useSelector((state: RootState) => state.meeting.isVideo)
  const userId = useSelector((state: RootState) => state.login.userId)
  const channelId = useSelector((state: RootState) => state.channel.id)
  const [myStream, setMyStream] = useState<LocalStream | null>(null)
  const { setMediaStream, setClient, setSignal } = useContext(useGlobalPipProvider())
  useEffect(() => {
    if (client && signal) {
      ;(async () => {
        try {
          const stream = await LocalStream.getUserMedia({
            codec: 'vp8',
            resolution: 'vga',
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              sampleRate: 48000
            },
            video: {
              width: 1280,
              height: 720,
              frameRate: 30
            },
            sendEmptyOnMute: true,
            simulcast: true
          })

          if (!stream) {
            return
          }

          setMyStream(stream)
          setMediaStream(stream)
          const videoTracks = stream.getVideoTracks()

          if (videoTracks.length) {
            videoTracks.forEach((track) => (track.enabled = isVideo))
          }

          signal.onopen = async () => {
            await client.join(channelId as string, userId as string)
            client.publish(stream)
            setClient(client)
            setSignal(signal)
          }

          if (myVideoRef.current) {
            myVideoRef.current.srcObject = stream
            myVideoRef.current.muted = true
          }
        } catch (error) {
          console.error('Error acquiring media stream:', error)
        }
      })()
    }
  }, [client, signal])

  useEffect(() => {
    if (myStream) {
      const videoTracks = myStream.getVideoTracks()

      if (videoTracks.length) {
        videoTracks.forEach((track) => (track.enabled = isVideo))
      }

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = myStream
        myVideoRef.current.muted = true
      }
    }
  }, [isVideo])

  useEffect(() => {
    if (myStream) {
      const tracks = myStream.getAudioTracks()

      if (tracks.length) {
        tracks.forEach((track) => (track.enabled = isAudio))
      }

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = myStream
        myVideoRef.current.muted = true
      }
    }
  }, [isAudio])

  return (
    <div className=" m-2 w-fit rounded-xl border-4 border-solid border-soft-purble shadow-sm shadow-secondry-gray">
      {((isVideo && isAudio) || (isVideo && !isAudio)) && (
        <video
          ref={myVideoRef}
          autoPlay
          playsInline
          className={`w-80 rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble duration-150`}
        ></video>
      )}

      {!isVideo && isAudio && (
        <>
          <video ref={myVideoRef} autoPlay playsInline hidden={true}></video>
          <div
            className={`flex h-40 w-80 items-end justify-end rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble p-2 backdrop-blur-md duration-150`}
          >
            <ScaleLoader color="#292929" height={25} width={3} />
          </div>
        </>
      )}

      {!isVideo && !isAudio && (
        <>
          <div
            className={`flex h-40 w-80 items-end justify-end rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble p-2 backdrop-blur-md duration-150`}
          >
            <FontAwesomeIcon icon={faMicrophoneSlash} className={`text-xl text-default-txt`} />
          </div>
        </>
      )}
    </div>
  )
}
