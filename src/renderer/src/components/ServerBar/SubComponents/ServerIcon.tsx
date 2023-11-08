/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
export default function ServerIcon({ id, photo, name, active, clickHandler }: any): JSX.Element {
  return (
    <div
      className={`h-18 w-18 mx-2 my-1 cursor-pointer rounded-full p-0 duration-150 ${
        active ? 'bg-soft-purble/75' : 'hover:bg-soft-white'
      }`}
      onClick={clickHandler}
    >
      <Link to={`/server/${id}`}>
        <img src={photo} alt={`${name} logo`} className="h-18 w-18" />
      </Link>
    </div>
  )
}
