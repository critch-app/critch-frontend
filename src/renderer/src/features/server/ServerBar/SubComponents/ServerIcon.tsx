import { Link } from 'react-router-dom'

export default function ServerIcon({ photo, name, active, clickHandler }: any): React.JSX.Element {
  return (
    <div className={`relative my-3 duration-200 hover:scale-125`}>
      {active && (
        <div
          className={`absolute right-2.5 top-0 h-16 w-16 rotate-45 rounded-3xl bg-soft-purble shadow-md shadow-extra-gray drop-shadow-2xl`}
        ></div>
      )}
      <div
        className={`relative mx-auto my-0.5 flex h-16 w-16 cursor-pointer items-center justify-center ${active ? '' : 'shadow-extra-gray'}`}
        onClick={clickHandler}
      >
        <Link to={`/server`}>
          <img src={photo} alt={`${name} logo`} className={`h-full w-full rounded-full`} />
        </Link>
      </div>
    </div>
  )
}
