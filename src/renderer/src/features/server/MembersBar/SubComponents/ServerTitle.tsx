/* eslint-disable @typescript-eslint/no-explicit-any */
// import Divider from '@renderer/components/Divider/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

/**
 * @property {name} @type any
 * @property {cover} @type any
 * @returns {ServerTitle} @type React.JSX.Element
 * @description The server title and cover component
 * @todo types didn't specified yet
 */
export default function ServerTitle({ name, cover }: any): React.JSX.Element {
  return (
    <>
      <div className="relative">
        <img src={cover} alt="" className="p-2" />
        <div
          className={`
          absolute 
          bottom-3 
          left-4 
          flex 
          w-[calc(100%-2rem)] 
          items-center 
          justify-between 
          rounded-lg 
        bg-primary-gray/30 
          px-2 py-1 text-lg text-soft-white 
          backdrop-blur-md`}
        >
          <span>{name}</span>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="cursor-pointer text-xl duration-150 hover:text-default-txt"
          />
        </div>
      </div>
    </>
  )
}
