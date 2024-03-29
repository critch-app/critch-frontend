import React, { useEffect, useRef } from 'react'

export default function PipRemoteVideo({
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
    <video
      ref={videoRef}
      autoPlay
      playsInline
      className={`w-80 rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble duration-150`}
    ></video>
  )
}
