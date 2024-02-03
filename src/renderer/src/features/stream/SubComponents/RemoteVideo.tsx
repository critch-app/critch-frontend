import React, { useEffect, useRef } from 'react'

export default function RemoteVideo({
  remoteStream,
  key
}: {
  remoteStream: MediaStream
  key: number
}): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    ;(async () => {
      if (remoteStream && videoRef?.current) {
        videoRef.current.srcObject = remoteStream
        videoRef.current.muted = false
        videoRef.current.autoplay = true
        videoRef.current.playsInline = true
      }
    })()
  }, [])

  return (
    <div
      key={key}
      className=" m-2 w-fit rounded-xl border-4 border-solid border-soft-purble shadow-sm shadow-secondry-gray"
    >
      <video
        key={key}
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-80 rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble duration-150`}
      ></video>
    </div>
  )
}
