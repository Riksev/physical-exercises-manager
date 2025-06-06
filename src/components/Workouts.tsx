import { useEffect, useState } from 'react'
import AddWorkoutModal from './modals/AddWorkoutModal'
import type { IWorkoutsProps } from '../interfaces'
import ListOfWorkouts from './ListOfWorkouts'

const Workouts = ({
   exercises,
   activeExercise,
   setWorkouts,
   workouts,
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

   const [filteredWorkouts, setFilteredWorkouts] = useState(workouts)

   useEffect(() => {
      setFilteredWorkouts(workouts)
   }, [workouts])

   const [error1, setError1] = useState<string>('')
   const [error2, setError2] = useState<string>('')

   const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] =
      useState<boolean>(false)

   const [selectedExerciseName, setSelectedExerciseName] = useState<string>(
      activeExercise.name === 'none' ? 'all' : activeExercise.name
   )

   return (
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
                     const value = e.target.value
                     setDateBegin(value)
                     if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        setError1('Дата не може бути порожньою.')
                     } else if (value > dateEnd) {
                        setError1(
                           'Дата початку не може бути пізніше дати закінчення.'
                        )
                     } else {
                        setError1('')
                     }
                  }}
               />
            </div>
            {error1 && <p className="mt-1 text-red-600">{error1}</p>}
            <div className="flex w-full flex-row items-center justify-between">
               <label htmlFor="dateEnd">До:</label>
               <input
                  type="date"
                  id="dateEnd"
                  value={dateEnd}
                  onChange={(e) => {
                     const value = e.target.value
                     setDateEnd(value)
                     if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        setError2('Дата не може бути порожньою.')
                     } else {
                        setError2('')
                     }
                  }}
               />
            </div>
            {error2 && <p className="mt-1 text-red-600">{error2}</p>}
            <div className="flex w-full flex-row items-center justify-between">
               <label htmlFor="exercise">Вправа:</label>
               <select
                  name="exercise"
                  id="exercise"
                  className="w-1/2 rounded border border-gray-400 p-2 hover:cursor-pointer hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedExerciseName}
                  onChange={(e) => setSelectedExerciseName(e.target.value)}
               >
                  <option value="all">Всі</option>
                  {exercises.map((exercise) => (
                     <option
                        key={exercise._id}
                        value={exercise.name}
                        className="hover:cursor-pointer"
                     >
                        {exercise.name}
                     </option>
                  ))}
               </select>
            </div>
            <button
               className="w-full bg-blue-500 px-4 py-2 hover:bg-blue-600 active:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600 disabled:opacity-50"
               onClick={() => {
                  setFilteredWorkouts(() => {
                     const updatedWorkouts = [...workouts]
                     const selectedExercise = exercises.find(
                        (exercise) => exercise.name === selectedExerciseName
                     ) || {
                        name: 'none',
                        _id: 'none',
                        hasReps: false,
                        hasWeight: false,
                        hasTime: false,
                     }
                     return updatedWorkouts.flatMap((workout) => {
                        const isWithinDateRange =
                           workout.date >= dateBegin && workout.date <= dateEnd

                        const isSelectedExercise =
                           selectedExerciseName === 'all' ||
                           (selectedExercise !== undefined &&
                              workout.workouts.some(
                                 (item) =>
                                    item.exercise_id === selectedExercise._id
                              ))

                        if (isWithinDateRange && isSelectedExercise) {
                           if (selectedExerciseName === 'all') {
                              return [workout]
                           }
                           return [
                              {
                                 ...workout,
                                 workouts: workout.workouts.filter(
                                    (item) =>
                                       item.exercise_id === selectedExercise._id
                                 ),
                              },
                           ]
                        }
                        return []
                     })
                  })
               }}
               disabled={
                  error1 !== '' || error2 !== '' || exercises.length === 0
               }
            >
               пошук
            </button>
         </div>
         <button
            className="w-full bg-green-500 p-4 hover:bg-green-600 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-600 disabled:opacity-50"
            onClick={() => {
               setIsAddWorkoutModalOpen(true)
            }}
            disabled={exercises.length === 0}
         >
            додати
         </button>
         <ListOfWorkouts workouts={filteredWorkouts} exercises={exercises} />
         {isAddWorkoutModalOpen && (
            <AddWorkoutModal
               setIsAddWorkoutModalOpen={setIsAddWorkoutModalOpen}
               selectedExerciseName={selectedExerciseName}
               exercises={exercises}
               setWorkouts={setWorkouts}
            />
         )}
      </div>
   )
}

export default Workouts
