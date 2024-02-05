import {
  faImages,
  faMicrophoneSlash,
  faPhoneSlash,
  faVideoSlash
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import {
  leaveMeeting,
  toggleAudio,
  togglePip,
  toggleVideo
} from '@renderer/reducers/meetingReducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@renderer/app/store'
import { setActiveChannelId } from '@renderer/reducers/channelReducer'
import { setActiveServerId } from '@renderer/reducers/serverReducer'
import PipSelfVideo from './PipSelfVideo'
import { useNavigate } from 'react-router-dom'
import { useGlobalPipProvider } from '@renderer/hooks/useGlobalPipProvider'
import PipRemoteVideo from './PipRemoteVideo'

export default function PipModal(): React.JSX.Element {
  const pip = useSelector((state: RootState) => state.meeting.pip)
  const joinedChannel = useSelector((state: RootState) => state.meeting.joinedChannel)
  const joinedServer = useSelector((state: RootState) => state.meeting.joinedServer)
  const isAudio = useSelector((state: RootState) => state.meeting.isAudio)
  const isVideo = useSelector((state: RootState) => state.meeting.isVideo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { client, signal, remoteStreams } = useContext(useGlobalPipProvider())

  return (
    <div className="group relative overflow-hidden ">
      <PipSelfVideo />
      {remoteStreams.map((stream) => {
        return (
          <div hidden={true} key={stream.id}>
            <PipRemoteVideo remoteStream={stream} />
          </div>
        )
      })}
      <div
        className={`absolute -bottom-20 left-1/2 flex h-fit w-[calc(90%)] -translate-x-1/2 items-center justify-evenly rounded-lg bg-default-txt/75 py-2 duration-300 group-hover:bottom-4`}
      >
        <button
          className={`mx-1 h-10 w-10 rounded-full duration-200 hover:scale-125 ${
            isAudio ? 'bg-hard-white text-default-txt' : 'bg-soft-purble text-original-white'
          }`}
          onClick={() => {
            dispatch(toggleAudio())
          }}
        >
          <FontAwesomeIcon icon={faMicrophoneSlash} className={`text-xs`} />
        </button>

        <button
          className={`h-10 w-10 rounded-full bg-hard-white  text-default-txt 
              duration-200 hover:scale-125 hover:bg-soft-purble hover:text-original-white
            `}
          onClick={() => {
            client?.leave()
            client?.close()
            signal?.close()
            dispatch(leaveMeeting())
          }}
        >
          <FontAwesomeIcon icon={faPhoneSlash} className={`text-xs`} />
        </button>

        <button
          className={`h-10 w-10 rounded-full  duration-200 hover:scale-125 ${
            isVideo ? 'bg-hard-white text-default-txt' : 'bg-soft-purble text-original-white'
          }`}
          onClick={() => {
            dispatch(toggleVideo())
          }}
        >
          <FontAwesomeIcon icon={faVideoSlash} className={`text-xs`} />
        </button>

        <button
          className={`rounded-full ${
            pip ? 'bg-soft-purble text-original-white ' : 'bg-hard-white text-default-txt '
          } h-10 w-10 
              duration-200 hover:scale-125 
            `}
          onClick={() => {
            dispatch(togglePip())
            dispatch(setActiveChannelId(joinedChannel))
            dispatch(setActiveServerId(joinedServer))
            navigate('/server')
          }}
        >
          <FontAwesomeIcon icon={faImages} className={`text-xs`} />
        </button>
      </div>
    </div>
  )
}
