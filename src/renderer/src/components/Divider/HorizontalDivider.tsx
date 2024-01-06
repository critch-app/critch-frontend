/**
 * Reusable Horizontal Divider Component
 * @property {string} height - Component height
 * @property {string} bgColor - Component color
 * @returns {React.JSX.Element } The rendered component.
 */
export default function HorizontalDivider({
  height,
  bgColor
}: {
  height: string
  bgColor: string
}): React.JSX.Element {
  return <div className={`lg mx-auto w-0.5 ${bgColor} ${height} rounded`}></div>
}
