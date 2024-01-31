export default function Divider({
  width,
  bgColor
}: {
  width: string
  bgColor: string
}): React.JSX.Element {
  return <div className={`lg mx-auto h-0.5 ${bgColor} ${width} rounded`}></div>
}
