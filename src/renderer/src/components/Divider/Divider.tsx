/**
 * Reusable Vertical Divider Component
 * @property {string} width - Component width
 * @property {string} bgColor - Component color
 * @returns {React.JSX.Element } The rendered component.
 */
export default function Divider({
  width,
  bgColor
}: {
  width: string
  bgColor: string
}): React.JSX.Element {
  return <div className={`lg mx-auto h-0.5 ${bgColor} ${width} rounded`}></div>
}
