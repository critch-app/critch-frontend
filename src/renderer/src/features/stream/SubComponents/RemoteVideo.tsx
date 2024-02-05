import React, { useEffect, useRef } from 'react'

export default function RemoteVideo({
  remoteStream
}: {
  remoteStream: MediaStream
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
    <div className="to-soft-purbl m-2 w-80 rounded-xl border-4 border-solid border-soft-purble bg-gradient-to-br from-hard-purble shadow-sm">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-80 rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble duration-150`}
      ></video>
    </div>
  )
}
