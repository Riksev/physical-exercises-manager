import type { IRemoveExerciseFromWorkoutModalProps } from '../../../interfaces'

const RemoveExerciseFromWorkoutModal = ({
   setIsRemoveExerciseFromWorkoutModalOpen,
   setWorkouts,
   activeWorkout,
   selectedExercise,
}: IRemoveExerciseFromWorkoutModalProps) => {
   return (
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Видалення вправи з тренування</h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsRemoveExerciseFromWorkoutModalOpen(false)}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <button
               type="button"
               className="button-remove button-modal"
               onClick={() => {
                  setWorkouts((prevWorkouts) => {
                     const updatedWorkouts = [...prevWorkouts]
                     const workoutIndex = updatedWorkouts.findIndex(
                        (w) => w._id === activeWorkout._id
                     )
                     if (workoutIndex !== -1) {
                        updatedWorkouts[workoutIndex].exercises =
                           updatedWorkouts[workoutIndex].exercises.filter(
                              (exercise) =>
                                 exercise.exercise_id !== selectedExercise._id
                           )
                     }
                     return updatedWorkouts
                  })
                  setIsRemoveExerciseFromWorkoutModalOpen(false)
               }}
            >
               видалити
            </button>
         </div>
      </div>
   )
}

export default RemoveExerciseFromWorkoutModal
