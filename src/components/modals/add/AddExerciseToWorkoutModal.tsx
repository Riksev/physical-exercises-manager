import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IExercise, IWorkout } from '../../../interfaces'
import ListOfExercises from '../../exercises/ListOfExercises'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setWorkouts } from '../../../features/dataSlice'
import { createPortal } from 'react-dom'

interface IAddExerciseToWorkoutModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   workout: IWorkout
}

const AddExerciseToWorkoutModal = ({
   setIsModalOpen,
   workout,
}: IAddExerciseToWorkoutModalProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

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
      const newWorkouts = workouts.map((w) =>
         w._id === workout._id
            ? {
                 ...w,
                 exercises: [
                    ...w.exercises.map((ex) => ({ ...ex })),
                    {
                       exercise_id: exercise._id,
                       addedAt: new Date().toISOString(),
                       records: [],
                    },
                 ],
              }
            : w
      )
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }

   return createPortal(
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Додавання вправи до тренування</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsModalOpen(false)
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
      </div>,
      document.body
   )
}

export default AddExerciseToWorkoutModal
