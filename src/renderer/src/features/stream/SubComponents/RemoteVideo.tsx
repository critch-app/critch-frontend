import React, { useEffect, useRef, useState } from 'react'

export default function RemoteVideo({
  remoteStream
}: {
  remoteStream: MediaStream
}): React.JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isFocused, setIsFocused] = useState(false)
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
      className={`${isFocused ? 'mx-auto w-[calc(100%)]' : 'm-2  w-80'} cursor-pointer rounded-xl border-4 border-solid border-soft-purble bg-gradient-to-br from-hard-purble to-soft-purble shadow-sm`}
    >
      <video
        onClick={(): void => {
          setIsFocused(!isFocused)
        }}
        ref={videoRef}
        autoPlay
        playsInline
        className={`w-full rounded-lg bg-gradient-to-br from-hard-purble to-soft-purble duration-150`}
      ></video>
    </div>
  )
}
