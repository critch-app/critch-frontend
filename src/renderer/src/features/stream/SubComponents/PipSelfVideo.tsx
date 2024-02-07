import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RootState } from '@renderer/app/store'
import { useGlobalPipProvider } from '@renderer/hooks/useGlobalPipProvider'
import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ScaleLoader } from 'react-spinners'

export default function PipSelfVideo(): React.JSX.Element {
  const myVideoRef = useRef<HTMLVideoElement | null>(null)
  const { mediaStream } = useContext(useGlobalPipProvider())
  const isAudio = useSelector((state: RootState) => state.meeting.isAudio)
  const isVideo = useSelector((state: RootState) => state.meeting.isVideo)
  useEffect(() => {
    if (myVideoRef.current && mediaStream) {
      myVideoRef.current.srcObject = mediaStream
    }
  }, [mediaStream])

  useEffect(() => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks()

      if (videoTracks.length) {
        videoTracks.forEach((track) => (track.enabled = isVideo))
      }

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = mediaStream
      }
    }
  }, [isVideo])

  useEffect(() => {
    if (mediaStream) {
      const tracks = mediaStream.getAudioTracks()

      if (tracks.length) {
        tracks.forEach((track) => (track.enabled = isAudio))
      }

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = mediaStream
      }
    }
  }, [isAudio])

  return (
    <div className="h-fit w-64 rounded-xl border-4 border-solid border-soft-purble shadow-sm shadow-secondry-gray">
      {((isVideo && isAudio) || (isVideo && !isAudio)) && (
        <video
          muted={true}
          ref={myVideoRef}
          autoPlay
          playsInline
          className={`rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble duration-150 `}
        ></video>
      )}

      {!isVideo && isAudio && (
        <>
          <video ref={myVideoRef} autoPlay playsInline hidden={true} muted={true}></video>
          <div
            className={`flex h-36  w-64 items-end justify-end rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble p-2 backdrop-blur-md duration-150`}
          >
            {isAudio ? (
              <ScaleLoader color="#292929" height={25} width={3} />
            ) : (
              <FontAwesomeIcon icon={faMicrophoneSlash} className={`text-xl text-default-txt`} />
            )}
          </div>
        </>
      )}

      {!isVideo && !isAudio && (
        <>
          <div
            className={`flex h-full w-full  items-end justify-end rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble p-2 backdrop-blur-md duration-150`}
          >
            {isAudio ? (
              <ScaleLoader color="#292929" height={25} width={3} />
            ) : (
              <FontAwesomeIcon icon={faMicrophoneSlash} className={`text-xl text-default-txt`} />
            )}
          </div>
        </>
      )}
    </div>
  )
}
