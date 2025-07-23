import type { Dispatch, SetStateAction } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { setExercises, setWorkouts } from '../../../features/dataSlice'
import { createPortal } from 'react-dom'

interface IRemoveDataModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const RemoveDataModal = ({ setIsModalOpen }: IRemoveDataModalProps) => {
   const dispatch = useAppDispatch()

   const handleClick = () => {
      dispatch(setExercises([]))
      dispatch(setWorkouts([]))

      setIsModalOpen(false)
   }

   return createPortal(
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Видалення даних</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsModalOpen(false)}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <button
               type="button"
               className="button-remove button-modal"
               onClick={handleClick}
            >
               видалити
            </button>
         </div>
      </div>,
      document.body
   )
}

export default RemoveDataModal
