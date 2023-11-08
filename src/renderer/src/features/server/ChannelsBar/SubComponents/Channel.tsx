/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import React from 'react'

/**
 * @property {id} @type any
 * @property {name} @type any
 * @property {active} @type any
 * @property {clickHandler} @type any
 * @returns {Channel} @type React.JSX.Element
 * @description The Channel Button Component
 * @todo types didn't specified yet
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
