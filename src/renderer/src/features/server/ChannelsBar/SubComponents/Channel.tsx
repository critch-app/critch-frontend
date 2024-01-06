/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import React from 'react'

/**
 * Description
 * @property {any} {id} - Channel id
 * @property {any} {name} - Channel name
 * @property {any} {active} - Channel state
 * @property {any} {clickHandler} - On channel click handler
 * @returns {React.JSX.Element}
 */
export default function Channel({ id, name, active, clickHandler }: any): React.JSX.Element {
  return (
    <Link to={`channel/${id}`}>
      <div
        className={active ? 'critch-active-channel' : 'critch-inactive-channel'}
        onClick={clickHandler}
      >
        <FontAwesomeIcon
          icon={faCirclePlay}
          className={` px-2 ${active ? '-rotate-90 font-bold text-soft-purble' : ''}`}
        />
        {name}
      </div>
    </Link>
  )
}
