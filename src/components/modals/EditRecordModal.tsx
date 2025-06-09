import { useEffect, useState } from 'react'
import type { IEditRecordModalProps } from '../../interfaces'

const EditRecordModal = ({
   setIsEditRecordModalOpen,
   setWorkouts,
   selectedWorkout,
   selectedExercise,
   selectedRecord,
}: IEditRecordModalProps) => {
   const [reps, setReps] = useState<string>('5')
   const [weight, setWeight] = useState<string>('20')
   const [time, setTime] = useState<string>('')

   const [errorReps, setErrorReps] = useState<string>('')
   const [errorWeight, setErrorWeight] = useState<string>('')
   const [errorTime, setErrorTime] = useState<string>('')

   useEffect(() => {
      if (reps === '') {
         setErrorReps('Поле не може бути порожнім.')
      } else {
         setErrorReps('')
      }
   }, [reps])

   useEffect(() => {
      if (weight === '') {
         setErrorWeight('Поле не може бути порожнім.')
      } else {
         setErrorWeight('')
      }
   }, [weight])

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
         <div className="mx-4 flex max-h-[90vh] w-full flex-col rounded-xl border-2 border-black/70 bg-white p-6 shadow-lg sm:w-2/3 lg:w-1/3">
            <div className="sticky top-0 z-120 mb-8 flex items-center justify-between border-b-2 border-black/70 bg-white pb-4">
               <h2 className="text-xl font-semibold text-wrap">
                  Редагування запису
               </h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsEditRecordModalOpen(false)
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white p-0 text-center text-5xl leading-none font-bold text-red-500 hover:bg-red-100"
               >
                  <span className="-translate-y-1.5">&times;</span>
               </button>
            </div>
            <div className="flex-1 overflow-y-auto">
               <div className="w-full pr-4 pl-2">
                  <div className="flex flex-col items-start gap-4 font-medium">
                     {selectedExercise?.hasReps && (
                        <div className="mb-4">
                           <label
                              className="mb-2 block text-left"
                              htmlFor="reps"
                           >
                              Повторення:
                           </label>
                           <input
                              type="number"
                              step="any"
                              id="reps"
                              min="0"
                              className="w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                           {errorReps && (
                              <p className="mt-1 block text-left text-red-600">
                                 {errorReps}
                              </p>
                           )}
                        </div>
                     )}
                     {selectedExercise?.hasWeight && (
                        <div className="mb-4">
                           <label
                              className="mb-2 block text-left"
                              htmlFor="weight"
                           >
                              Робоча вага (кг):
                           </label>
                           <input
                              type="number"
                              step="any"
                              id="weight"
                              min="0"
                              className="w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                           {errorWeight && (
                              <p className="mt-1 block text-left text-red-600">
                                 {errorWeight}
                              </p>
                           )}
                        </div>
                     )}
                     {selectedExercise?.hasTime && (
                        <div className="mb-4">
                           <label
                              className="mb-2 block text-left"
                              htmlFor="time"
                           >
                              Час виконання:
                           </label>
                           <input
                              type="text"
                              id="time"
                              className="w-full rounded border border-gray-500 p-2 hover:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  </div>
               </div>
               <h2 className="mb-4 w-full border-b-2 border-black/70 pb-4 text-xl font-semibold"></h2>
               <button
                  type="button"
                  className="w-full bg-yellow-500 px-4 py-2 hover:bg-yellow-600 active:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-600 disabled:opacity-50"
                  onClick={() => {
                     setWorkouts((prev) => {
                        const updated = [...prev]

                        const editedRecord = {
                           ...selectedRecord,
                           ...(selectedExercise?.hasReps && {
                              reps: parseFloat(reps),
                           }),
                           ...(selectedExercise?.hasWeight && {
                              weight: parseFloat(weight),
                           }),
                           ...(selectedExercise?.hasTime && {
                              time: time,
                           }),
                        }

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
                                 ].records[recordIndex] = editedRecord
                              }
                           }
                        }

                        return updated
                     })
                     setIsEditRecordModalOpen(false)
                  }}
                  disabled={
                     (selectedExercise?.hasReps && errorReps !== '') ||
                     (selectedExercise?.hasWeight && errorWeight !== '') ||
                     (selectedExercise?.hasTime && errorTime !== '')
                  }
               >
                  редагувати
               </button>
            </div>
         </div>
      </div>
   )
}

export default EditRecordModal
