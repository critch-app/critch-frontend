import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from 'react-router-dom'
/**
 * Renders an error message within a modal window.
 *
 * @property {string} error - The error message to display.
 * @returns {React.JSX.Element} The rendered error modal.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UnrecoveredError(): React.JSX.Element {
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')
  return (
    <div
      className={`flex h-[calc(95vh)] w-[calc(100vw)] translate-x-2 translate-y-2 items-center
           justify-center rounded-lg bg-soft-white text-default-txt`}
    >
      <div className="flex-col items-center justify-center">
        <FontAwesomeIcon
          icon={faCircleExclamation}
          className={`animate-bounce py-5 text-8xl text-soft-purble`}
        />
        <h1 className={`text-2xl`}>{error}</h1>
      </div>
    </div>
  )
}
