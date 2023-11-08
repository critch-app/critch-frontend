import logo from '@renderer/assets/images/logo.png'
export default function AppIcon(): JSX.Element {
  return (
    <>
      <div>
        <img src={logo} alt="logo" className="cursor-pointer py-2" />
      </div>
    </>
  )
}
