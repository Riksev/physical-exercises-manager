import type { IRemoveWorkoutModalProps } from '../../interfaces'

const RemoveWorkoutModal = ({
   setIsRemoveWorkoutModalOpen,
   setWorkouts,
   activeWorkout,
}: IRemoveWorkoutModalProps) => {
   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Видалення тренування</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsRemoveWorkoutModalOpen(false)}
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
                        (w) => w._id === activeWorkout._id
                     )
                     if (workoutIndex !== -1) {
                        updated.splice(workoutIndex, 1)
                     }
                     return updated
                  })
                  setIsRemoveWorkoutModalOpen(false)
               }}
            >
               видалити
            </button>
         </div>
      </div>
   )
}

export default RemoveWorkoutModal
