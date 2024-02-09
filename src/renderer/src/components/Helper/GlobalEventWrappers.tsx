import { useGlobalEventListeners } from '@renderer/hooks/useGlobalEventListners'
import Error from '../Error/Error'
export default function GlobalEventsWrapper({ children }): React.JSX.Element {
  const { isError, error } = useGlobalEventListeners()
  return (
    <>
      {isError && <Error error={error} reset={null} />}
      {children}
    </>
  )
}
