export const scrollToBottom = (windowRef: React.RefObject<HTMLDivElement> | null): void => {
  if (!windowRef || !windowRef.current) return

  const { scrollHeight, clientHeight } = windowRef.current

  if (scrollHeight > clientHeight) {
    windowRef.current.scrollTop = scrollHeight - clientHeight
  }
}
