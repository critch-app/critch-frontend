import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../Modal/Modal'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

/**
 * Renders an error message within a modal window.
 *
 * @property {string} error - The error message to display.
 * @returns {React.JSX.Element} The rendered error modal.
 */
export default function Error({ error }: { error: string }): React.JSX.Element {
  const navigate = useNavigate()
  return (
    <Modal>
      <div
        className={`flex h-[calc(90%)] w-[calc(90%)] items-center justify-center rounded-lg
         bg-soft-white text-default-txt`}
      >
        <div className="justfy-center flex-col items-center">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className={` animate-bounce py-5 text-8xl text-soft-purble`}
          />
          <h1 className={`text-2xl`}>{error}</h1>
          <button
            onClick={(): void => {
              navigate(0)
            }}
            className={`my-5 rounded-md bg-soft-purble p-2 text-sm
            text-original-white hover:bg-soft-purble/80`}
          >
            Go Back
          </button>
        </div>
      </div>
    </Modal>
  )
}
