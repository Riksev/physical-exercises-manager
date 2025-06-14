import type { IRemoveRecordModalProps } from '../../interfaces'

const RemoveRecordModal = ({
   setIsRemoveRecordModalOpen,
   setWorkouts,
   selectedWorkout,
   selectedExercise,
   selectedRecord,
}: IRemoveRecordModalProps) => {
   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Видалення запису</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsRemoveRecordModalOpen(false)}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <button
               type="button"
               className="button-remove button-modal"
               onClick={() => {
                  setWorkouts((prev) => {
                     const updated = [...prev]
                     const workoutIndex = updated.findIndex(
                        (w) => w._id === selectedWorkout._id
                     )
                     if (workoutIndex !== -1) {
                        const exerciseIndex = updated[
                           workoutIndex
                        ].exercises.findIndex(
                           (ex) => ex.exercise_id === selectedExercise._id
                        )
                        if (exerciseIndex !== -1) {
                           const recordIndex = updated[workoutIndex].exercises[
                              exerciseIndex
                           ].records.findIndex(
                              (rec) => rec._id === selectedRecord._id
                           )
                           if (recordIndex !== -1) {
                              updated[workoutIndex].exercises[
                                 exerciseIndex
                              ].records.splice(recordIndex, 1)
                           }
                        }
                     }
                     return updated
                  })
                  setIsRemoveRecordModalOpen(false)
               }}
            >
               видалити
            </button>
         </div>
      </div>
   )
}

export default RemoveRecordModal
