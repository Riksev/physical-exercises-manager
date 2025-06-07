import { useEffect, useState } from 'react'
import type {
   IAddWorkoutModalProps,
   IExercise,
   IRecord,
} from '../../interfaces'

const AddWorkoutModal = ({
   setIsAddWorkoutModalOpen,
   selectedExerciseName,
   exercises,
   setWorkouts,
}: IAddWorkoutModalProps) => {
   const [exerciseName, setExerciseName] = useState<string>(
      selectedExerciseName === 'all' ? 'none' : selectedExerciseName
   )

   const emptyExercise: IExercise = {
      name: 'none',
      _id: 'none',
      hasReps: false,
      hasWeight: false,
      hasTime: false,
   }

   const [selectedExercise, setSelectedExercise] = useState<IExercise>(
      selectedExerciseName === 'all'
         ? emptyExercise
         : (exercises.find(
              (exercise) => exercise.name === selectedExerciseName
           ) as IExercise)
   )

   const [date, setDate] = useState<string>(() => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   })

   const [reps, setReps] = useState<string>('1')
   const [weight, setWeight] = useState<string>('100')
   const [time, setTime] = useState<string>('')

   const [errorDate, setErrorDate] = useState<string>('')
   const [errorTime, setErrorTime] = useState<string>('')

   useEffect(() => {
      if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDate('Дата не може бути порожньою.')
      } else {
         setErrorDate('')
      }
   }, [date])

   useEffect(() => {
      if (!time.match(/^\d{2}:\d{2}:\d{2}$/)) {
         setErrorTime('Невірний формат часу. Використовуйте HH:MM:SS.')
      } else if (time === '00:00:00') {
         setErrorTime('Час не може бути 00:00:00.')
      } else {
         setErrorTime('')
      }
   }, [time])

   return (
      <div className="fixed top-0 left-0 z-100 flex h-full w-full items-center justify-center bg-black/50">
         <div className="mx-4 max-h-[90vh] w-full overflow-y-auto rounded-xl border-2 border-black/70 bg-white p-6 text-lg font-medium shadow-lg sm:w-2/3 lg:w-1/3">
            <h2 className="mb-8 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold">
               Додавання тренування
            </h2>
            <form className="text-left">
               <div className="mb-4">
                  <label className="mb-2 block text-left" htmlFor="date">
                     Дата
                  </label>
                  <input
                     type="date"
                     id="date"
                     className="w-full rounded border border-gray-300 p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     value={date}
                     onChange={(e) => {
                        setDate(e.target.value)
                     }}
                  />
                  {errorDate && (
                     <p className="mt-1 block text-left text-red-600">
                        {errorDate}
                     </p>
                  )}
               </div>
               <div className="mb-4">
                  <label className="mb-2 block text-left" htmlFor="exercise">
                     Вправа
                  </label>
                  <select
                     name="exercise"
                     id="exercise"
                     className="w-full rounded border border-gray-300 p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                     value={exerciseName}
                     onChange={(e) => {
                        setExerciseName(e.target.value)
                        setSelectedExercise(
                           (exercises.find(
                              (exercise) => exercise.name === e.target.value
                           ) as IExercise) || emptyExercise
                        )
                     }}
                  >
                     <option value="none">Оберіть вправу</option>
                     {exercises.map((exercise) => (
                        <option key={exercise._id} value={exercise.name}>
                           {exercise.name}
                        </option>
                     ))}
                  </select>
               </div>
               {selectedExercise.hasReps && (
                  <div className="mb-4">
                     <label className="mb-2 block text-left" htmlFor="reps">
                        Повторення:
                     </label>
                     <input
                        type="number"
                        step="any"
                        id="reps"
                        min="0"
                        className="w-full rounded border border-gray-300 p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Введіть кількість повторень"
                        value={reps}
                        onChange={(e) => {
                           setReps(e.target.value)
                        }}
                        onKeyDown={(e) => {
                           if (
                              e.key === '-' ||
                              e.key === 'e' ||
                              e.key === 'Enter'
                           ) {
                              e.preventDefault()
                           }
                        }}
                        onPaste={(e) => e.preventDefault()}
                     />
                  </div>
               )}
               {selectedExercise.hasWeight && (
                  <div className="mb-4">
                     <label className="mb-2 block text-left" htmlFor="weight">
                        Додаткова вага:
                     </label>
                     <input
                        type="number"
                        step="any"
                        id="weight"
                        min="0"
                        className="w-full rounded border border-gray-300 p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Введіть додаткову вагу"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        onKeyDown={(e) => {
                           if (
                              e.key === '-' ||
                              e.key === 'e' ||
                              e.key === 'Enter'
                           ) {
                              e.preventDefault()
                           }
                        }}
                        onPaste={(e) => e.preventDefault()}
                     />
                  </div>
               )}
               {selectedExercise.hasTime && (
                  <div className="mb-4">
                     <label className="mb-2 block text-left" htmlFor="time">
                        Час виконання:
                     </label>
                     <input
                        type="text"
                        id="time"
                        className="w-full rounded border border-gray-300 p-2 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Введіть час виконання HH:MM:SS"
                        value={time}
                        onChange={(e) => {
                           setTime(e.target.value)
                        }}
                        onKeyDown={(e) => {
                           if (
                              e.key === '-' ||
                              e.key === 'e' ||
                              e.key === 'Enter'
                           ) {
                              e.preventDefault()
                           }
                        }}
                        onPaste={(e) => e.preventDefault()}
                     />
                     {errorTime && (
                        <p className="mt-1 block text-left text-red-600">
                           {errorTime}
                        </p>
                     )}
                  </div>
               )}
               <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold"></h2>
               <div className="flex flex-col gap-4">
                  <button
                     type="button"
                     className="w-full bg-green-500 px-4 py-2 hover:bg-green-600 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-600 disabled:opacity-50"
                     onClick={() => {
                        setWorkouts((prev) => {
                           const newRecord: IRecord = {
                              ...(selectedExercise.hasReps && {
                                 reps: parseFloat(reps),
                              }),
                              ...(selectedExercise.hasWeight && {
                                 weight: parseFloat(weight),
                              }),
                              ...(selectedExercise.hasTime && {
                                 time,
                              }),
                           }
                           const updated = [...prev]
                           let inserted = false
                           for (let i = 0; i < updated.length; i++) {
                              if (updated[i].date === date) {
                                 // If date already exists
                                 if (updated[i].exercises) {
                                    // If exercises array exists for this date
                                    const exerciseIndex = updated[
                                       i
                                    ].exercises.findIndex(
                                       (ex) =>
                                          ex.exercise_id ===
                                          selectedExercise._id
                                    )
                                    if (exerciseIndex !== -1) {
                                       // If exercise already exists for this date
                                       updated[i].exercises[
                                          exerciseIndex
                                       ].records.push(newRecord)
                                    } else {
                                       // If exercises array does not contain the selected exercise
                                       updated[i].exercises.push({
                                          exercise_id: selectedExercise._id,
                                          records: [newRecord],
                                       })
                                    }
                                 } else {
                                    // If exercises array does not exist for this date
                                    updated[i].exercises = [
                                       {
                                          exercise_id: selectedExercise._id,
                                          records: [newRecord],
                                       },
                                    ]
                                 }
                                 inserted = true
                                 break
                              } else if (updated[i].date > date) {
                                 // If date is less than current date
                                 updated.splice(i, 0, {
                                    date,
                                    exercises: [
                                       {
                                          exercise_id: selectedExercise._id,
                                          records: [newRecord],
                                       },
                                    ],
                                 })
                                 inserted = true
                                 break
                              }
                           }
                           if (!inserted) {
                              // If date is greater than all existing dates
                              updated.push({
                                 date,
                                 exercises: [
                                    {
                                       exercise_id: selectedExercise._id,
                                       records: [newRecord],
                                    },
                                 ],
                              })
                           }
                           return updated
                        })
                        setIsAddWorkoutModalOpen(false)
                     }}
                     disabled={
                        errorDate !== '' ||
                        selectedExercise.name === 'none' ||
                        (selectedExercise.hasTime && errorTime !== '')
                     }
                  >
                     додати
                  </button>
                  <button
                     type="button"
                     className="w-full bg-gray-300 px-4 py-2 hover:bg-gray-400 active:bg-gray-400"
                     onClick={() => {
                        setIsAddWorkoutModalOpen(false)
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

export default AddWorkoutModal
