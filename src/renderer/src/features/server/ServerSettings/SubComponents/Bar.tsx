import { useEffect } from 'react'

export default function Bar({
  pageNumber,
  setPageNumber
}: {
  pageNumber: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}): React.JSX.Element {
  useEffect(() => {}, [pageNumber])
  return (
    <div>
      <div
        onClick={(): void => {
          setPageNumber(1)
        }}
        className={`critch-inactive-channel ${pageNumber == 1 ? 'critch-active-channel' : ''}`}
      >
        Edit Server
      </div>
      <div
        onClick={(): void => {
          setPageNumber(2)
        }}
        className={`critch-inactive-channel ${pageNumber == 2 ? 'critch-active-channel' : ''}`}
      >
        Add Members
      </div>
    </div>
  )
}
