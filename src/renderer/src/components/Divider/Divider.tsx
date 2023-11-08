import React from 'react'

/**
 * @property {width} @type {string} @description taillwind valid width styling
 * @property {bgColor} @type {string} @description taillwind valid background color styling
 * @returns {Divider} @type React.JSX.Element
 * @description A global reusable vertical divider component
 */
import { DividerProps } from './Divider.d'
export default function Divider({ width, bgColor }: DividerProps): React.JSX.Element {
  return <div className={`lg mx-auto h-0.5 ${bgColor} ${width} rounded`}></div>
}
