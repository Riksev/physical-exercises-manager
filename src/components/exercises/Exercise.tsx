import { useState, type Dispatch, type SetStateAction } from 'react'
import EditExerciseModal from '../modals/edit/EditExerciseModal'
import RemoveExerciseModal from '../modals/remove/RemoveExerciseModal'
import type { IExercise } from '../../interfaces'

interface IExerciseProps {
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
}

const Exercise = ({ activeExercise, setActiveExercise }: IExerciseProps) => {
   const [isEditExerciseModalOpen, setIsEditExerciseModalOpen] =
      useState<boolean>(false)
   const [isRemoveExerciseModalOpen, setIsRemoveExerciseModalOpen] =
      useState<boolean>(false)

   return (
      <>
         <h2 className="horizontal-line title">{activeExercise?.name}</h2>
         <div className="flex w-full flex-col items-center gap-4">
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

         {isEditExerciseModalOpen && (
            <EditExerciseModal
               setIsModalOpen={setIsEditExerciseModalOpen}
               activeExercise={activeExercise}
            />
         )}
         {isRemoveExerciseModalOpen && (
            <RemoveExerciseModal
               setIsModalOpen={setIsRemoveExerciseModalOpen}
               activeExercise={activeExercise}
            />
         )}
      </>
   )
}

export default Exercise
