import type { IRemoveExerciseModalProps } from '../../interfaces'

const RemoveExerciseModal = ({
   setIsRemoveExerciseModalOpen,
   setExercises,
   exercises,
   activeExercise,
   setActiveExercise,
   setWorkouts,
}: IRemoveExerciseModalProps) => {
   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 max-h-[90vh] w-full overflow-y-auto rounded-xl border-2 border-black/70 bg-white p-6 shadow-lg sm:w-2/3 lg:w-1/3">
            <h2 className="mb-8 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold">
               Видалення вправи
            </h2>
            <form>
               <div className="flex flex-col gap-4">
                  <button
                     type="button"
                     className="bg-red-500 px-4 py-2 hover:bg-red-800 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800"
                     onClick={() => {
                        const newExercise = exercises.filter(
                           (exercise) => exercise.name !== activeExercise.name
                        )
                        setExercises(newExercise)

                        setWorkouts((prevWorkouts) => {
                           const updatedWorkouts = [...prevWorkouts]
                           return updatedWorkouts.flatMap((workout) => {
                              const filteredExercises =
                                 workout.exercises.filter(
                                    (exercise) =>
                                       exercise.exercise_id !==
                                       activeExercise._id
                                 )
                              if (filteredExercises.length !== 0) {
                                 return [
                                    {
                                       ...workout,
                                       exercises: filteredExercises,
                                    },
                                 ]
                              }
                              return []
                           })
                        })

                        setIsRemoveExerciseModalOpen(false)
                        setActiveExercise({
                           name: 'none',
                           _id: 'none',
                           hasReps: false,
                           hasWeight: false,
                           hasTime: false,
                        })
                     }}
                  >
                     видалити
                  </button>
                  <button
                     type="button"
                     className="w-full bg-gray-300 px-4 py-2 hover:bg-gray-400 active:bg-gray-400"
                     onClick={() => {
                        setIsRemoveExerciseModalOpen(false)
                     }}
                  >
                     скасувати
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default RemoveExerciseModal
