import { useState } from 'react'
import RemoveExerciseModal from './modals/RemoveExerciseModal'
import EditExerciseModal from './modals/EditExerciseModal'
import type { IExerciseProps } from '../interfaces'

const Exercise = ({
   activeExercise,
   setActiveExercise,
   setExercises,
   setWorkouts,
}: IExerciseProps) => {
   const [isRemoveExerciseModalOpen, setIsRemoveExerciseModalOpen] =
      useState<boolean>(false)
   const [isEditExerciseModalOpen, setIsEditExerciseModalOpen] =
      useState<boolean>(false)

   return (
      <>
         <h2 className="horizontal-line">{activeExercise?.name}</h2>
         <div className="flex w-full flex-col items-center gap-2">
            <button
               className="button-edit button-full"
               onClick={() => {
                  setIsEditExerciseModalOpen(true)
               }}
            >
               редагувати
            </button>
            <button
               className="button-remove button-full"
               onClick={() => {
                  setIsRemoveExerciseModalOpen(true)
               }}
            >
               видалити
            </button>
            <button
               className="button-action button-full"
               onClick={() => {
                  setActiveExercise(null)
               }}
            >
               назад
            </button>
         </div>
         {isRemoveExerciseModalOpen && (
            <RemoveExerciseModal
               setIsRemoveExerciseModalOpen={setIsRemoveExerciseModalOpen}
               setExercises={setExercises}
               activeExercise={activeExercise}
               setWorkouts={setWorkouts}
            />
         )}
         {isEditExerciseModalOpen && (
            <EditExerciseModal
               setIsEditExerciseModalOpen={setIsEditExerciseModalOpen}
               setExercises={setExercises}
               activeExercise={activeExercise}
            />
         )}
      </>
   )
}

export default Exercise
