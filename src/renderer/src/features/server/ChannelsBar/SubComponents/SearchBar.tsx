import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

/**
 * @property none
 * @returns {SearchBar} @type React.JSX.Element
 * @description The Search Bar Component
 */
export default function SearchBar(): React.JSX.Element {
  return (
    <div
      className={`
    m-2
    cursor-pointer 
    rounded-3xl 
    border-2 
    border-solid 
    border-original-white 
    bg-original-white 
    p-2 
    text-sm 
    text-default-txt/50 
    hover:border-extra-gray/75`}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} /> Search Channels
    </div>
  )
}
