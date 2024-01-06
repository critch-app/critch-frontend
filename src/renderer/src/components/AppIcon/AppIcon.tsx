import logo from '@renderer/assets/images/logo.png'
/**
 * Reusable app icon component
 * @property {string} height - Component height
 * @property {string} width - Component width
 * @returns {React.JSX.Element} The rendered component.
 */
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
