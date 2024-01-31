import logo from '@renderer/assets/images/logo.png'
export default function AppIcon({
  height,
  width
}: {
  height: string
  width: string
}): React.JSX.Element {
  return (
    <>
      <div className={`${height} ${width}`}>
        <img src={logo} alt="logo" className="cursor-pointer py-2" />
      </div>
    </>
  )
}
