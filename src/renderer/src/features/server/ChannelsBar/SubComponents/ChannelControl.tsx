import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setActiveChannel } from '@renderer/features/server/ChannelsBar/channelsBarReducer'
import AddChannelModal from '../../AddChannel/AddChannelModal'
import Modal from '@renderer/components/Modal/Modal'

/**
 * Server Control Buttons
 * @returns {React.JSX.Element} renderer component.
 */
export default function ServerControl(): React.JSX.Element {
  const dispatch = useDispatch()
  const [isAddChannelModalOpened, toggleAddChannelModal] = useState(false)
  return (
    <>
      {isAddChannelModalOpened ? (
        <Modal>
          <AddChannelModal toggleModal={toggleAddChannelModal} />
        </Modal>
      ) : null}
      <div className={`flex-col items-center justify-center`}>
        <div
          className={`m-1 cursor-pointer rounded-md bg-original-white px-2 py-1
         text-default-txt duration-150 hover:bg-soft-purble hover:text-original-white`}
          onClick={(): void => {
            dispatch(setActiveChannel(null))
          }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div
          className={`m-1 cursor-pointer rounded-md bg-original-white px-2 py-1
         text-default-txt duration-150 hover:bg-soft-purble hover:text-original-white`}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div
          onClick={(): void => {
            toggleAddChannelModal(true)
          }}
          className={`m-1 cursor-pointer rounded-md bg-original-white px-2 py-1
         text-default-txt duration-150 hover:bg-soft-purble hover:text-original-white`}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </>
  )
}
