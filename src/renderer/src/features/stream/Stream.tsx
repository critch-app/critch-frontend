import {
  faImages,
  faMicrophoneSlash,
  faPhoneSlash,
  faVideoSlash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import SelfVideo from './SubComponents/SelfVideo'
import {
  leaveMeeting,
  toggleAudio,
  togglePip,
  toggleVideo
} from '@renderer/reducers/meetingReducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { Client, RemoteStream } from 'ion-sdk-js'
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl'
import { Configuration } from 'ion-sdk-js/lib/client'
import RemoteVideo from './SubComponents/RemoteVideo'
import { useGlobalPipProvider } from '@renderer/hooks/useGlobalPipProvider'

export default function Stream(): React.JSX.Element {
  const dispatch = useDispatch()
  const isAudio = useSelector((state: RootState) => state.meeting.isAudio)
  const isVideo = useSelector((state: RootState) => state.meeting.isVideo)
  const { setRemoteStreams: setPipRemoteStreams } = useContext(useGlobalPipProvider())
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([])

  const handleRemoteStream = (stream: RemoteStream) => {
    const uniqueStreams = new Set([...remoteStreams, stream])
    setRemoteStreams(Array.from(uniqueStreams))
    setPipRemoteStreams(Array.from(uniqueStreams))
  }

  const handleLeftRemoteStream = (stream: RemoteStream) => {
    setRemoteStreams((prevStreams) =>
      prevStreams.filter((st) => {
        st !== stream
      })
    )
    setPipRemoteStreams((prevStreams) =>
      prevStreams.filter((st) => {
        st !== stream
      })
    )
  }

  const [signal, setSignal] = useState<IonSFUJSONRPCSignal | null>(null)
  const [client, setClient] = useState<Client | null>(null)

  //ws://localhost:7000/ws
  useEffect(() => {
    setSignal(new IonSFUJSONRPCSignal('wss://critch-sfu.onrender.com/ws'))
  }, [])

  useEffect(() => {
    const configState: Configuration = {
      iceServers: [
        {
          urls: 'stun:stun.relay.metered.ca:80'
        },
        {
          urls: 'turn:standard.relay.metered.ca:80',
          username: '32ac5cf8dcaca44684c899af',
          credential: '3LR3pdJCv7mSm2/c'
        }
      ],
      codec: 'vp8'
    }
    if (signal) {
      setClient(new Client(signal, configState))
    }
  }, [signal])

  useEffect(() => {
    if (client) {
      client.ontrack = (_track: MediaStreamTrack, stream: RemoteStream) => {
        handleRemoteStream(stream)
        stream.onremovetrack = () => {
          handleLeftRemoteStream(stream)
        }
      }
    }
  }, [client])

  return (
    <div className="min-w-[calc(100%-31rem)] max-w-[calc(100%-31rem)] flex-col">
      <div
        className={`critch-overflow-hidden-scroll relative flex h-[calc(100vh-7rem)] min-w-[calc(100%-31rem)]  flex-wrap items-center justify-evenly overflow-y-scroll rounded-lg  bg-hard-white p-3`}
      >
        <SelfVideo client={client} signal={signal} />
        {remoteStreams.map((stream) => {
          return (
            <div key={stream.id}>
              <RemoteVideo remoteStream={stream} />
            </div>
          )
        })}
      </div>

      <div
        className={`relative flex h-[calc(5rem)] min-w-[calc(100%-31rem)] items-center justify-evenly rounded-lg`}
      >
        <button
          className={`rounded-full p-5 duration-200 hover:scale-125 ${
            isAudio ? 'bg-hard-white text-default-txt' : 'bg-soft-purble text-original-white'
          }`}
          onClick={() => {
            dispatch(toggleAudio())
          }}
        >
          <FontAwesomeIcon icon={faMicrophoneSlash} className={`text-xl`} />
        </button>
        <button
          className={`rounded-full bg-hard-white p-5 text-default-txt 
            duration-200 hover:scale-125 hover:bg-soft-purble hover:text-original-white
          `}
          onClick={() => {
            client?.leave()
            client?.close()
            signal?.close()
            dispatch(leaveMeeting())
          }}
        >
          <FontAwesomeIcon icon={faPhoneSlash} className={`text-xl`} />
        </button>
        <button
          className={`rounded-full p-5 duration-200 hover:scale-125 ${
            isVideo ? 'bg-hard-white text-default-txt' : 'bg-soft-purble text-original-white'
          }`}
          onClick={() => {
            dispatch(toggleVideo())
          }}
        >
          <FontAwesomeIcon icon={faVideoSlash} className={`text-xl`} />
        </button>
        <button
          className={`rounded-full bg-hard-white p-5 text-default-txt 
            duration-200 hover:scale-125 hover:bg-soft-purble hover:text-original-white
          `}
          onClick={() => {
            dispatch(togglePip())
          }}
        >
          <FontAwesomeIcon icon={faImages} className={`text-xl`} />
        </button>
      </div>
    </div>
  )
}
