import { useEffect, useState } from 'react'
import type { IEditRecordModalProps } from '../../interfaces'

const EditRecordModal = ({
   setIsEditRecordModalOpen,
   setWorkouts,
   selectedWorkout,
   selectedExercise,
   selectedRecord,
}: IEditRecordModalProps) => {
   const [reps, setReps] = useState<string>(
      selectedRecord.reps?.toString() || '5'
   )
   const [weight, setWeight] = useState<string>(
      selectedRecord.weight?.toString() || '20'
   )
   const [time, setTime] = useState<string>(selectedRecord.time || '')

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
      <div className="modal-bg">
         <div className="modal-content">
            <div className="modal-header">
               <h2>Редагування запису</h2>
               <button
                  type="button"
                  aria-label="Закрити"
                  onClick={() => {
                     setIsEditRecordModalOpen(false)
                  }}
                  className="button-close"
               >
                  <span>&times;</span>
               </button>
            </div>
            <div className="content-overflow-y">
               <div className="modal-main">
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
                  {selectedExercise?.hasWeight && (
                     <div className="input-block">
                        <label htmlFor="weight">Робоча вага (кг):</label>
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
               className="button-edit button-modal"
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
                           const recordIndex = updated[workoutIndex].exercises[
                              exerciseIndex
                           ].records.findIndex(
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
   )
}

export default EditRecordModal
