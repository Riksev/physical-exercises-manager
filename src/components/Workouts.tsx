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
      <div className="w-full text-xl font-medium">
         <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-3xl font-bold">
            Тренування
         </h2>
         <div className="mb-4 flex w-full flex-col items-center justify-between gap-4 border-b-2 border-black/70 pb-4">
            <div className="flex w-full flex-row items-center justify-between">
               <label htmlFor="dateBegin">Від:</label>
               <input
                  type="date"
                  id="dateBegin"
                  value={dateBegin}
                  onChange={(e) => {
                     setDateBegin(e.target.value)
                  }}
               />
            </div>
            {errorDateBegin && (
               <p className="mt-1 text-red-600">{errorDateBegin}</p>
            )}
            <div className="flex w-full flex-row items-center justify-between">
               <label htmlFor="dateEnd">До:</label>
               <input
                  type="date"
                  id="dateEnd"
                  value={dateEnd}
                  onChange={(e) => {
                     setDateEnd(e.target.value)
                  }}
               />
            </div>
            {errorDateEnd && (
               <p className="mt-1 text-red-600">{errorDateEnd}</p>
            )}
            <div className="flex w-full flex-row items-center justify-between">
               <label htmlFor="exercise">Вправа:</label>
               <div className="relative flex w-full items-center justify-end">
                  <input
                     readOnly
                     type="text"
                     name="exercise"
                     id="exercise"
                     className="w-2/3 rounded border border-gray-400 p-2 pr-10 hover:cursor-pointer hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     value={selectedExercise?.name || 'Всі вправи'}
                     onClick={() => setIsSelectExerciseModalOpen(true)}
                  />
                  <span className="absolute right-3 text-gray-500 hover:text-gray-700">
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
               className="w-full bg-blue-500 px-4 py-2 hover:bg-blue-600 active:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:opacity-50"
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
               пошук
            </button>
         </div>
         <button
            className="w-full bg-green-500 p-4 hover:bg-green-600 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-600 disabled:opacity-50"
            onClick={() => {
               setIsAddWorkoutModalOpen(true)
            }}
         >
            додати
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
