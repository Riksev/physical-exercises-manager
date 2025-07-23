import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import AddWorkoutModal from '../modals/add/AddWorkoutModal'
import type { IExercise, IWorkout } from '../../interfaces'
import ListOfWorkouts from './ListOfWorkouts'
import Workout from './Workout'
import SelectExerciseModal from '../modals/other/SelectExerciseModal'
import { useAppSelector } from '../../app/hooks'

interface IWorkoutsProps {
   filteredWorkouts: IWorkout[]
   setFilteredWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   dateBegin: string
   setDateBegin: Dispatch<SetStateAction<string>>
   dateEnd: string
   setDateEnd: Dispatch<SetStateAction<string>>
   isFiltered: boolean
   setIsFiltered: Dispatch<SetStateAction<boolean>>
   selectedExercise: IExercise | null
   setSelectedExercise: Dispatch<SetStateAction<IExercise | null>>
   activeWorkout: IWorkout | null
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   scrollRef: React.RefObject<HTMLDivElement | null>
}

const Workouts = ({
   filteredWorkouts,
   dateBegin,
   setDateBegin,
   dateEnd,
   setDateEnd,
   setFilteredWorkouts,
   isFiltered,
   setIsFiltered,
   selectedExercise,
   setSelectedExercise,
   activeWorkout,
   setActiveWorkout,
   scrollRef,
}: IWorkoutsProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)

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
      if (scrollRef.current) {
         scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
   }, [activeWorkout, scrollRef])

   useEffect(() => {
      if (!dateBegin.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDateBegin('Дата не може бути порожньою.')
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
      <div className="app-page">
         <h2 className="horizontal-line title">Мої тренування</h2>
         <details className="details">
            <summary>
               Фільтри{' '}
               <span className="text-red-500">{isFiltered ? '✅' : '❌'}</span>
            </summary>
            <div className="flex w-full flex-col items-center justify-between gap-2">
               <div className="input-block-row">
                  <label htmlFor="dateBegin">Від:</label>
                  <input
                     type="date"
                     id="dateBegin"
                     className="w-2/3 sm:w-1/2"
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
                     className="w-2/3 sm:w-1/2"
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
                        className="w-9/10 pr-8 sm:w-4/7"
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
                  className="button-action button-modal mb-2"
                  onClick={() => {
                     setFilteredWorkouts(() => {
                        const updatedWorkouts = [...workouts]
                        const exerciseInfo: IExercise | null = selectedExercise
                           ? exercises.find(
                                (exercise) =>
                                   exercise.name === selectedExercise.name
                             ) || null
                           : null
                        const fromDate =
                           dateBegin < dateEnd ? dateBegin : dateEnd
                        const toDate = dateBegin < dateEnd ? dateEnd : dateBegin
                        const newWorkouts = updatedWorkouts.flatMap(
                           (workout) => {
                              if (
                                 workout.date < fromDate ||
                                 workout.date > toDate
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
                                    exercises: [
                                       workout.exercises[exerciseIndex],
                                    ],
                                 },
                              ]
                           }
                        )
                        return dateBegin > dateEnd
                           ? newWorkouts.reverse()
                           : newWorkouts
                     })
                     setIsFiltered(true)
                  }}
                  disabled={errorDateBegin !== '' || errorDateEnd !== ''}
               >
                  застосувати
               </button>
               <button
                  className="button-action button-modal"
                  onClick={() => {
                     setFilteredWorkouts(workouts.slice().reverse())
                     setIsFiltered(false)
                  }}
               >
                  скинути
               </button>
            </div>
         </details>
         <h2 className="horizontal-line my-1"></h2>
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
            clicker={setActiveWorkout}
         />
         {isAddWorkoutModalOpen && (
            <AddWorkoutModal
               setIsModalOpen={setIsAddWorkoutModalOpen}
               setActiveWorkout={setActiveWorkout}
            />
         )}
         {isSelectExerciseModalOpen && (
            <SelectExerciseModal
               setIsModalOpen={setIsSelectExerciseModalOpen}
               clicker={exerciseInteraction}
            />
         )}
      </div>
   ) : (
      <Workout
         activeWorkout={activeWorkout}
         setActiveWorkout={setActiveWorkout}
      />
   )
}

export default Workouts
