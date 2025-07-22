import type { Dispatch, SetStateAction } from 'react'
import type { IExercise, IWorkout, IWorkoutExercise } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setExercises, setWorkouts } from '../../../features/dataSlice'

interface IRemoveExerciseModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   activeExercise: IExercise
}

const RemoveExerciseModal = ({
   setIsModalOpen,
   activeExercise,
}: IRemoveExerciseModalProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   const handleClick = () => {
      const newExercises: IExercise[] = [...exercises]
      const exerciseIndex: number = newExercises.findIndex(
         (ex) => ex._id === activeExercise._id
      )
      if (exerciseIndex !== -1) {
         newExercises.splice(exerciseIndex, 1)
      }
      dispatch(setExercises(newExercises))

      const newWorkouts: IWorkout[] = workouts.flatMap((w) => {
         const filteredExercises: IWorkoutExercise[] = w.exercises.filter(
            (ex) => ex.exercise_id !== activeExercise._id
         )
         if (filteredExercises.length !== 0) {
            return [
               {
                  ...w,
                  exercises: filteredExercises,
               },
            ]
         }
         return []
      })
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }

   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>
                  Видалення вправи <br className="block sm:hidden"></br>"
                  {activeExercise.name}"
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

export default RemoveExerciseModal
