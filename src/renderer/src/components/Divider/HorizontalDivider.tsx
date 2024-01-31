export default function HorizontalDivider({
  height,
  bgColor
}: {
  height: string
  bgColor: string
}): React.JSX.Element {
  return <div className={`lg mx-auto w-0.5 ${bgColor} ${height} rounded`}></div>
}
