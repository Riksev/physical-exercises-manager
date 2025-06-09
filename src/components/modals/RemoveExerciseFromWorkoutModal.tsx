import type { IRemoveExerciseFromWorkoutModalProps } from '../../interfaces'

const RemoveExerciseFromWorkoutModal = ({
   setIsRemoveExerciseFromWorkoutModalOpen,
   setWorkouts,
   activeWorkout,
   selectedExercise,
}: IRemoveExerciseFromWorkoutModalProps) => {
   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 flex max-h-[90vh] w-full flex-col rounded-xl border-2 border-black/70 bg-white p-6 shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Видалення вправи з тренування
               </h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsRemoveExerciseFromWorkoutModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            {/* <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
                  <div className="flex flex-col gap-4"></div>
               </div>
            </div> */}
            <button
               type="button"
               className="bg-red-500 px-4 py-2 hover:bg-red-800 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800"
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
