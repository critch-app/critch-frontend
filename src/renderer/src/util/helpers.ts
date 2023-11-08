export const scrollToBottom = (windowRef: React.RefObject<HTMLDivElement> | null): void => {
  if (!windowRef) return
  if (windowRef.current) {
    windowRef.current.scrollTop = windowRef.current.scrollHeight
  }
}
