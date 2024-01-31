import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import React from 'react'

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
