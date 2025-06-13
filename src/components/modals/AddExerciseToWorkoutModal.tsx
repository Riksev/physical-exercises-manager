import { useEffect, useState } from 'react'
import type {
   IAddExerciseToWorkoutModalProps,
   IExercise,
} from '../../interfaces'
import ListOfExercises from '../ListOfExercises'

const AddExerciseToWorkoutModal = ({
   setAddExerciseToWorkoutModalOpen,
   exercises,
   setWorkouts,
   workout,
}: IAddExerciseToWorkoutModalProps) => {
   const [searchName, setSearchName] = useState<string>('')
   const [filteredExercises, setFilteredExercises] =
      useState<IExercise[]>(exercises)

   useEffect(() => {
      setFilteredExercises(() => {
         return exercises.filter(
            (exercise) =>
               !workout.exercises.some(
                  (exerciseInWorkout) =>
                     exercise._id === exerciseInWorkout.exercise_id
               )
         )
      })
   }, [exercises, workout])

   const exerciseInteraction = (exercise: IExercise) => {
      setWorkouts((prev) => {
         const updated = [...prev]
         const workoutIndex = updated.findIndex((w) => w._id === workout._id)
         if (workoutIndex !== -1) {
            updated[workoutIndex].exercises.push({
               exercise_id: exercise._id,
               records: [],
            })
         }
         return updated
      })
      setAddExerciseToWorkoutModalOpen(false)
   }

   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 flex max-h-[90vh] w-full flex-col rounded-xl border-2 border-black/70 bg-white p-6 shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Додавання вправи до тренування
               </h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setAddExerciseToWorkoutModalOpen(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
                  <div className="flex flex-col items-start gap-4">
                     <label htmlFor="searchName">Пошук за назвою:</label>
                     <input
                        type="text"
                        id="searchName"
                        className="w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Введіть назву вправи"
                        autoComplete="off"
                        value={searchName}
                        onChange={(e) => {
                           setSearchName(e.target.value)
                        }}
                     />
                     <button
                        className="button-action button-modal"
                        onClick={() => {
                           setFilteredExercises(
                              exercises.filter(
                                 (exercise) =>
                                    exercise.name
                                       .toLowerCase()
                                       .includes(searchName.toLowerCase()) &&
                                    !workout?.exercises?.some(
                                       (exerciseInWorkout) =>
                                          exerciseInWorkout.exercise_id ===
                                          exercise._id
                                    )
                              )
                           )
                        }}
                     >
                        пошук
                     </button>
                  </div>
                  <h2 className="horizontal-line"></h2>
                  <ListOfExercises
                     exercises={filteredExercises}
                     clicker={exerciseInteraction}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default AddExerciseToWorkoutModal
