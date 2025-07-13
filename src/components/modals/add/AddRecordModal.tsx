import { useEffect, useState } from 'react'
import type { IAddRecordModalProps, IRecord } from '../../../interfaces'

const AddRecordModal = ({
   setIsAddRecordModalOpen,
   selectedExercise,
   setWorkouts,
   selectedWorkout,
}: IAddRecordModalProps) => {
   const [reps, setReps] = useState<string>('')
   const [weight, setWeight] = useState<string>('')
   const [time, setTime] = useState<string>('00:00:00')

   const [errorReps, setErrorReps] = useState<string>('')
   const [errorWeight, setErrorWeight] = useState<string>('')
   const [errorTime, setErrorTime] = useState<string>('')

   useEffect(() => {
      const activeExercise = selectedWorkout.exercises.find(
         (ex) => ex.exercise_id === selectedExercise._id
      )
      const lastRecord =
         activeExercise?.records[activeExercise.records.length - 1]
      if (selectedExercise?.hasReps) {
         const prevReps = lastRecord?.reps ?? ''
         setReps(prevReps.toString())
      }
      if (selectedExercise?.hasWeight) {
         const prevWeight = lastRecord?.weight ?? ''
         setWeight(prevWeight.toString())
      }
      if (selectedExercise?.hasTime) {
         const prevTime = lastRecord?.time ?? '00:00:00'
         setTime(prevTime.toString())
      }
   }, [
      selectedExercise._id,
      selectedExercise?.hasReps,
      selectedExercise?.hasTime,
      selectedExercise?.hasWeight,
      selectedWorkout.exercises,
   ])

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
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Додавання запису</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsAddRecordModalOpen(false)
                  }}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <div className="content-overflow-y">
               <div className="modal-main">
                  {selectedExercise?.hasWeight && (
                     <div className="input-block">
                        <label htmlFor="weight">Робоча вага:</label>
                        <input
                           type="number"
                           step="any"
                           id="weight"
                           min="0"
                           placeholder="Введіть робочу вагу"
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
                           <p className="error-message">{errorWeight}</p>
                        )}
                     </div>
                  )}
                  {selectedExercise?.hasReps && (
                     <div className="input-block">
                        <label htmlFor="reps">Повторення:</label>
                        <input
                           type="number"
                           step="any"
                           id="reps"
                           min="0"
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
                           <p className="error-message">{errorReps}</p>
                        )}
                     </div>
                  )}
                  {selectedExercise?.hasTime && (
                     <div className="input-block">
                        <label htmlFor="time">Час виконання:</label>
                        <input
                           type="text"
                           id="time"
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
                           <p className="error-message">{errorTime}</p>
                        )}
                     </div>
                  )}
               </div>
            </div>
            <h2 className="horizontal-line"></h2>
            <button
               type="button"
               className="button-add button-modal"
               onClick={() => {
                  setWorkouts((prev) => {
                     const newRecord: IRecord = {
                        _id: new Date().getTime().toString(),
                        ...(selectedExercise?.hasReps && {
                           reps: parseFloat(reps),
                        }),
                        ...(selectedExercise?.hasWeight && {
                           weight: parseFloat(weight),
                        }),
                        ...(selectedExercise?.hasTime && {
                           time,
                        }),
                        addedAt: new Date().toISOString(),
                     }
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
                           updated[workoutIndex].exercises[
                              exerciseIndex
                           ].records.push(newRecord)
                        }
                     }

                     return updated
                  })
                  setIsAddRecordModalOpen(false)
               }}
               disabled={
                  (selectedExercise?.hasReps && errorReps !== '') ||
                  (selectedExercise?.hasWeight && errorWeight !== '') ||
                  (selectedExercise?.hasTime && errorTime !== '')
               }
            >
               додати
            </button>
         </div>
      </div>
   )
}

export default AddRecordModal
