import { Link } from 'react-router-dom'

export default function ServerIcon({
  id,
  photo,
  name,
  active,
  clickHandler
}: any): React.JSX.Element {
  return (
    <div className={`relative`}>
      {active && (
        <div
          className={`absolute left-2 h-16 w-32 rounded-l-full bg-soft-purble shadow-md
           shadow-extra-gray drop-shadow-2xl duration-150`}
        ></div>
      )}
      <div
        className={`relative mx-auto my-0.5 flex h-16 w-16 
      cursor-pointer items-center justify-center rounded-full bg-none p-0 duration-150
      ${active ? '' : 'shadow-extra-gray hover:scale-125 hover:drop-shadow-2xl '}`}
        onClick={clickHandler}
      >
        <Link to={`/server/${id}`}>
          <img src={photo} alt={`${name} logo`} className={`h-full w-full rounded-full`} />
        </Link>
      </div>
    </div>
  )
}
