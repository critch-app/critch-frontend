import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../Modal/Modal'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function Error({
  error,
  reset
}: {
  error: string
  reset: (() => void) | null
}): React.JSX.Element {
  const [isModalOpen, toggleModal] = useState(true)
  if (isModalOpen) {
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
                toggleModal(false)
                if (reset) {
                  reset()
                }
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
  } else {
    return <div className="hidden"></div>
  }
}
