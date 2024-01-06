import { HashLoader } from 'react-spinners'
import Modal from '../Modal/Modal'

/**
 * Renders an loading overlay
 *
 * @property {number} size - The Loading spinner size
 * @returns {React.JSX.Element} The rendered component.
 */
export default function Loading({ size }: { size: number }): React.JSX.Element {
  return (
    <Modal>
      <div
        className={`flex h-[calc(90%)] w-[calc(90%)] items-center justify-center rounded-lg
          text-default-txt`}
      >
        <HashLoader color="#ffffff" size={size} />
      </div>
    </Modal>
  )
}
