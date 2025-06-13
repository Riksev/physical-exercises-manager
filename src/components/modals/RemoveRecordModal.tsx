import type { IRemoveRecordModalProps } from '../../interfaces'

const RemoveRecordModal = ({
   setIsRemoveRecordModalOpen,
   setWorkouts,
   selectedWorkout,
   selectedExercise,
   selectedRecord,
}: IRemoveRecordModalProps) => {
   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 flex max-h-[90vh] w-full flex-col rounded-xl border-2 border-black/70 bg-white p-6 shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Видалення запису
               </h2>
               <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsRemoveRecordModalOpen(false)}
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
            <div className="flex flex-col gap-4">
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
                              const recordIndex = updated[
                                 workoutIndex
                              ].exercises[exerciseIndex].records.findIndex(
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
      </div>
   )
}

export default RemoveRecordModal
