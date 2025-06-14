import { useEffect, useState } from 'react'
import AddWorkoutModal from './modals/AddWorkoutModal'
import type { IExercise, IWorkoutsProps } from '../interfaces'
import ListOfWorkouts from './ListOfWorkouts'
import Workout from './Workout'
import SelectExerciseModal from './modals/SelectExerciseModal'

const Workouts = ({
   exercises,
   setWorkouts,
   workouts,
   activeWorkout,
   setActiveWorkout,
   scrollRef,
}: IWorkoutsProps) => {
   const [dateBegin, setDateBegin] = useState<string>(() => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = '01'
      return `${year}-${month}-${day}`
   })
   const [dateEnd, setDateEnd] = useState<string>(() => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   })
   const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
      null
   )
   const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)

   const [errorDateBegin, setErrorDateBegin] = useState<string>('')
   const [errorDateEnd, setErrorDateEnd] = useState<string>('')

   const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] =
      useState<boolean>(false)
   const [isSelectExerciseModalOpen, setIsSelectExerciseModalOpen] =
      useState<boolean>(false)

   const exerciseInteraction = (exercise: IExercise) => {
      setSelectedExercise(exercise)
      setIsSelectExerciseModalOpen(false)
   }

   useEffect(() => {
      setFilteredWorkouts(workouts)
   }, [workouts])

   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
   }, [activeWorkout, scrollRef])

   useEffect(() => {
      if (!dateBegin.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDateBegin('Дата не може бути порожньою.')
      } else if (dateBegin > dateEnd) {
         setErrorDateBegin('Дата початку не може бути пізніше дати закінчення.')
      } else {
         setErrorDateBegin('')
      }

      if (!dateEnd.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDateEnd('Дата не може бути порожньою.')
      } else {
         setErrorDateEnd('')
      }
   }, [dateBegin, dateEnd])

   return !activeWorkout ? (
      <div className="page-container">
         <h2 className="horizontal-line title">Мої тренування</h2>
         <div className="flex w-full flex-col items-center justify-between gap-2">
            <div className="input-block-row">
               <label htmlFor="dateBegin">Від:</label>
               <input
                  type="date"
                  id="dateBegin"
                  className="w-1/2"
                  value={dateBegin}
                  onChange={(e) => {
                     setDateBegin(e.target.value)
                  }}
               />
            </div>
            {errorDateBegin && (
               <p className="error-message">{errorDateBegin}</p>
            )}
            <div className="input-block-row">
               <label htmlFor="dateEnd">До:</label>
               <input
                  type="date"
                  id="dateEnd"
                  className="w-1/2"
                  value={dateEnd}
                  onChange={(e) => {
                     setDateEnd(e.target.value)
                  }}
               />
            </div>
            {errorDateEnd && <p className="error-message">{errorDateEnd}</p>}
            <div className="input-block-row">
               <label htmlFor="exercise">Вправа:</label>
               <div className="relative flex w-full items-center justify-end">
                  <input
                     readOnly
                     type="text"
                     id="exercise"
                     className="w-2/3"
                     value={selectedExercise?.name || 'Всі вправи'}
                     onClick={() => setIsSelectExerciseModalOpen(true)}
                  />
                  <span className="pointer-events-none absolute right-3 text-gray-500 hover:text-gray-700">
                     <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M9 5l7 7-7 7"
                        />
                     </svg>
                  </span>
               </div>
            </div>
            <button
               className="button-action button-modal"
               onClick={() => {
                  setFilteredWorkouts(() => {
                     const updatedWorkouts = [...workouts]
                     const exerciseInfo: IExercise | null = selectedExercise
                        ? exercises.find(
                             (exercise) =>
                                exercise.name === selectedExercise.name
                          ) || null
                        : null

                     return updatedWorkouts.flatMap((workout) => {
                        if (
                           workout.date < dateBegin ||
                           workout.date > dateEnd
                        ) {
                           return []
                        }
                        if (!exerciseInfo) {
                           return [workout]
                        }
                        const exerciseIndex = workout.exercises.findIndex(
                           (ex) => ex.exercise_id === exerciseInfo._id
                        )
                        if (exerciseIndex === -1) {
                           return []
                        }
                        return [
                           {
                              ...workout,
                              exercises: [workout.exercises[exerciseIndex]],
                           },
                        ]
                     })
                  })
               }}
               disabled={errorDateBegin !== '' || errorDateEnd !== ''}
            >
               пошук тренувань
            </button>
         </div>
         <h2 className="horizontal-line"></h2>
         <button
            className="button-add button-full"
            onClick={() => {
               setIsAddWorkoutModalOpen(true)
            }}
         >
            додати тренування
         </button>
         <ListOfWorkouts
            workouts={filteredWorkouts}
            exercises={exercises}
            clicker={setActiveWorkout}
         />
         {isAddWorkoutModalOpen && (
            <AddWorkoutModal
               setIsAddWorkoutModalOpen={setIsAddWorkoutModalOpen}
               setWorkouts={setWorkouts}
               setActiveWorkout={setActiveWorkout}
            />
         )}
         {isSelectExerciseModalOpen && (
            <SelectExerciseModal
               setIsSelectExerciseModalOpen={setIsSelectExerciseModalOpen}
               clicker={exerciseInteraction}
               exercises={exercises}
            />
         )}
      </div>
   ) : (
      <Workout
         activeWorkout={activeWorkout}
         setActiveWorkout={setActiveWorkout}
         exercises={exercises}
         setWorkouts={setWorkouts}
      />
   )
}

export default Workouts
