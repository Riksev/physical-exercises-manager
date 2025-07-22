import type { Dispatch, SetStateAction } from 'react'
import type { IWorkout } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setWorkouts } from '../../../features/dataSlice'

interface IRemoveWorkoutModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   activeWorkout: IWorkout
}

const RemoveWorkoutModal = ({
   setIsModalOpen,
   activeWorkout,
}: IRemoveWorkoutModalProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   const handleClick = () => {
      const newWorkouts = [...workouts]
      const workoutIndex = newWorkouts.findIndex(
         (w) => w._id === activeWorkout._id
      )
      if (workoutIndex !== -1) {
         newWorkouts.splice(workoutIndex, 1)
      }
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>
                  Видалення тренування
                  <br className="block sm:hidden"></br>"{activeWorkout.date}"
               </h2>
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
      </div>
   )
}

export default RemoveWorkoutModal
