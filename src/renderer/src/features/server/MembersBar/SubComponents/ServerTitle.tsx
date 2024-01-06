/* eslint-disable @typescript-eslint/no-explicit-any */
// import Divider from '@renderer/components/Divider/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import Modal from '@renderer/components/Modal/Modal'
import ServerSettingsModal from '../../ServerSettings/ServerSettingsModal'

/**
 * TODO: Under development
 * ServerTitle component
 * @property {any} name - Server name
 * @property {any} cover - Server cover
 * @returns {any} renderer component.
 */
export default function ServerTitle({ name, cover }: any): React.JSX.Element {
  const [isSettingsModalOpened, toggleSettingsModal] = useState(false)
  return (
    <>
      {isSettingsModalOpened && (
        <Modal>
          <ServerSettingsModal toggleModal={toggleSettingsModal} />
        </Modal>
      )}
      <div className={`relative`}>
        <img src={cover} alt="" className="p-2" />
        <div
          onClick={(): void => {
            toggleSettingsModal(true)
          }}
          className={`absolute bottom-3 left-4 flex w-[calc(100%-2rem)] items-center justify-between 
          rounded-lg bg-primary-gray/30 px-2 py-1 text-lg text-soft-white backdrop-blur-md`}
        >
          <span>{name}</span>
          <FontAwesomeIcon
            icon={faGear}
            className={`cursor-pointer text-xl duration-150 hover:rotate-90 hover:scale-125`}
          />
        </div>
      </div>
    </>
  )
}
