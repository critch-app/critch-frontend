import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Divider from '@renderer/components/Divider/Divider'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'

// TODO: Under Development
export default function AddMembers(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [UUID, setUUID] = useState('')
  const validationSchema = Yup.object({
    id: Yup.string().trim().uuid()
  })

  const validateOnChange = async (): Promise<void> => {
    try {
      const res = await validationSchema.validate({ id: inputValue })
      if (res && res.id) {
        setUUID(res.id)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      /* empty */
    }
  }

  useEffect(() => {
    if (UUID) {
      console.log(UUID)
    }
  }, [inputValue, UUID])

  return (
    <div
      className={`h-[calc(100%)] w-[calc(100%)] flex-col justify-center rounded-lg bg-original-white`}
    >
      <div>
        <h1 className={`px-3 py-2 text-xl text-default-txt`}>Add Members</h1>
        <Divider width={`w-[calc(100%-2rem)]`} bgColor={`bg-primary-gray`} />
      </div>
      <div className={`relative flex items-center justify-center`}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={`absolute left-[calc(7%)] top-[calc(50%)] -translate-y-1/2 text-default-txt`}
        />
        <input
          type="text"
          placeholder="Search Members With ID"
          onChange={async (ev): Promise<void> => {
            setInputValue(ev.target.value)
            await validateOnChange()
          }}
          onBlur={async (): Promise<void> => {
            await validateOnChange()
          }}
          name="ID"
          value={inputValue}
          className={`critch-form-input my-2 w-[calc(90%)] rounded-full pl-[calc(5%)] text-lg`}
        />
      </div>
    </div>
  )
}
