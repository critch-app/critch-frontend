import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Bar from './SubComponents/Bar'
import { useState } from 'react'
import AddMembers from './SubComponents/AddMember'

export default function ServerSettingsModal({
  toggleModal
}: {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>
}): React.JSX.Element {
  const [pageNumber, setPageNumber] = useState(1)
  return (
    <div className={`relative`}>
      <div
        className={`flex h-[calc(80vh)] w-[calc(70vw)] items-start 
        justify-start rounded-lg bg-soft-white p-5 text-default-txt`}
      >
        <Bar pageNumber={pageNumber} setPageNumber={setPageNumber} />
        {pageNumber == 2 && <AddMembers />}
      </div>
      <button
        onClick={(): void => {
          toggleModal(false)
        }}
        className={`absolute right-6 top-6 text-lg text-default-txt hover:text-soft-purble`}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  )
}
