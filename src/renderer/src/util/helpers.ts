export const scrollToBottom = (windowRef: React.RefObject<HTMLDivElement> | null): void => {
  if (!windowRef || !windowRef.current) return

  const { scrollHeight, clientHeight } = windowRef.current

  if (scrollHeight > clientHeight) {
    windowRef.current.scrollTop = scrollHeight - clientHeight
  }
}

export const getUserMedia = async (voice: boolean, video: boolean): Promise<MediaStream> => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    frameRate: 30
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: voice,
    video: video ? videoConstraints : false
  })
  return stream
}

export const getUserScreen = async (voice: boolean): Promise<MediaStream> => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    frameRate: 30,
    mandatory: {
      chromeMediaSource: 'desktop'
    }
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: voice,
    video: videoConstraints
  })
  return stream
}
