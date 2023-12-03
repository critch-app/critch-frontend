import { useNavigate } from 'react-router-dom'

/**
 * Component representing the home/DM view.
 * @component
 * @returns {React.JSX.Element} The rendered component.
 */
export default function Home(): React.JSX.Element {
  // TODO: Later Will Contain The DM Page
  const navigate = useNavigate()
  return (
    <div className="my-1 flex max-h-[calc(100%)] min-h-[calc(100%)] w-[calc(100vw)]  justify-between rounded-2xl bg-soft-white">
      <button
        onClick={(): void => {
          navigate('/register')
        }}
      >
        Register
      </button>
      <button
        onClick={(): void => {
          navigate('/login')
        }}
      >
        Login
      </button>
      <button
        onClick={(): void => {
          navigate('/server/1')
        }}
      >
        Server
      </button>
    </div>
  )
}
