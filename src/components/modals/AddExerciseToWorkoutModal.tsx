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
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Додавання вправи до тренування</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setAddExerciseToWorkoutModalOpen(false)
                  }}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <div className="content-overflow-y">
               <div className="modal-main">
                  <div className="input-block">
                     <label htmlFor="searchName">Пошук за назвою:</label>
                     <input
                        type="text"
                        id="searchName"
                        placeholder="Введіть назву вправи"
                        autoComplete="off"
                        value={searchName}
                        onChange={(e) => {
                           setSearchName(e.target.value)
                        }}
                     />
                  </div>
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
   )
}

export default AddExerciseToWorkoutModal
