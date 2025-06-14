import type { IRemoveExerciseModalProps } from '../../interfaces'

const RemoveExerciseModal = ({
   setIsRemoveExerciseModalOpen,
   setExercises,
   activeExercise,
   setWorkouts,
}: IRemoveExerciseModalProps) => {
   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Видалення вправи</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsRemoveExerciseModalOpen(false)}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <button
               type="button"
               className="button-remove button-modal"
               onClick={() => {
                  setExercises((prev) => {
                     const updated = [...prev]
                     const exerciseIndex = updated.findIndex(
                        (ex) => ex._id === activeExercise._id
                     )
                     if (exerciseIndex !== -1) {
                        updated.splice(exerciseIndex, 1)
                     }
                     return updated
                  })

                  setWorkouts((prev) => {
                     const updated = [...prev]
                     return updated.flatMap((w) => {
                        const filteredExercises = w.exercises.filter(
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
                  })

                  setIsRemoveExerciseModalOpen(false)
               }}
            >
               видалити
            </button>
         </div>
      </div>
   )
}

export default RemoveExerciseModal
