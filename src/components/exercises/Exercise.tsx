import { type Dispatch, type SetStateAction } from 'react'
import type { IExercise, IModal } from '../../interfaces'

interface IExerciseProps {
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
   setModal: Dispatch<SetStateAction<IModal | null>>
}

const Exercise = ({
   activeExercise,
   setActiveExercise,
   setModal,
}: IExerciseProps) => {
   return (
      <div className="app-page">
         <h2 className="horizontal-line title">{activeExercise?.name}</h2>
         <div className="flex w-full flex-col items-center gap-4">
            <button
               className="button-edit button-full"
               onClick={() => {
                  setModal({
                     action: 'edit',
                     item: 'exercise',
                     data: { activeExercise },
                  })
               }}
            >
               редагувати
            </button>
            <button
               className="button-delete button-full"
               onClick={() => {
                  setModal({
                     action: 'delete',
                     item: 'exercise',
                     data: { activeExercise },
                  })
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
      </div>
   )
}

export default Exercise
