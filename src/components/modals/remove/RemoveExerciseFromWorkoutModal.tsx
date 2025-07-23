import type { Dispatch, SetStateAction } from 'react'
import type { IExercise, IWorkout } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setWorkouts } from '../../../features/dataSlice'
import { createPortal } from 'react-dom'

interface IRemoveExerciseFromWorkoutModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   activeWorkout: IWorkout
   selectedExercise: IExercise
}

const RemoveExerciseFromWorkoutModal = ({
   setIsModalOpen,
   activeWorkout,
   selectedExercise,
}: IRemoveExerciseFromWorkoutModalProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   const handleClick = () => {
      const newWorkouts = workouts.map((workout) => {
         if (workout._id === activeWorkout._id) {
            return {
               ...workout,
               exercises: workout.exercises.filter(
                  (exercise) => exercise.exercise_id !== selectedExercise._id
               ),
            }
         }
         return workout
      })
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }

   return createPortal(
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>
                  Видалення вправи <br className="block sm:hidden"></br>"
                  {selectedExercise.name}" <br></br>з тренування{' '}
                  <br className="block sm:hidden"></br> "{activeWorkout.date}"
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
      </div>,
      document.body
   )
}

export default RemoveExerciseFromWorkoutModal
