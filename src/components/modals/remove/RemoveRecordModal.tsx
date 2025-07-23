import type { Dispatch, SetStateAction } from 'react'
import type { IExercise, IRecord, IWorkout } from '../../../interfaces'
import { setWorkouts } from '../../../features/dataSlice'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { createPortal } from 'react-dom'

interface IRemoveRecordModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   selectedWorkout: IWorkout
   selectedExercise: IExercise
   selectedRecord: IRecord
}

const RemoveRecordModal = ({
   setIsModalOpen,
   selectedWorkout,
   selectedExercise,
   selectedRecord,
}: IRemoveRecordModalProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   const handleClick = () => {
      const newWorkouts = workouts.map((workout) => {
         if (workout._id !== selectedWorkout._id) return workout
         return {
            ...workout,
            exercises: workout.exercises.map((exercise) => {
               if (exercise.exercise_id !== selectedExercise._id)
                  return exercise
               return {
                  ...exercise,
                  records: exercise.records.filter(
                     (record) => record._id !== selectedRecord._id
                  ),
               }
            }),
         }
      })
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }
   return createPortal(
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>
                  Видалення запису <br className="block sm:hidden"></br>"
                  {[
                     selectedRecord.weight ?? '-',
                     selectedRecord.reps ?? '-',
                     selectedRecord.time ?? '-',
                  ].join('x')}
                  "
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

export default RemoveRecordModal
