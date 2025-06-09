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
         <h2 className="mb-2 w-full border-b-2 border-black/70 pb-4 text-3xl font-bold">
            {activeExercise?.name}
         </h2>
         <div className="flex w-full flex-col items-center gap-2">
            <button
               className="w-full bg-yellow-500 p-4 hover:bg-yellow-600 active:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-600"
               onClick={() => {
                  setIsEditExerciseModalOpen(true)
               }}
            >
               редагувати
            </button>
            <button
               className="w-full bg-red-500 p-4 hover:bg-red-800 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800"
               onClick={() => {
                  setIsRemoveExerciseModalOpen(true)
               }}
            >
               видалити
            </button>
            <button
               className="w-full bg-blue-500 p-4 hover:bg-blue-600 active:bg-blue-600"
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
