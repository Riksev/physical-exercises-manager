import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IExercise, IRecord, IWorkout } from '../../../interfaces'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setWorkouts } from '../../../features/dataSlice'

export interface IAddRecordModalProps {
   setIsModalOpen: Dispatch<SetStateAction<boolean>>
   selectedExercise: IExercise
   selectedWorkout: IWorkout
}

const AddRecordModal = ({
   setIsModalOpen,
   selectedExercise,
   selectedWorkout,
}: IAddRecordModalProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const dispatch = useAppDispatch()

   const [reps, setReps] = useState<string>('-')
   const [weight, setWeight] = useState<string>('-')
   const [time, setTime] = useState<string>('-')

   const [isLoading, setIsLoading] = useState<boolean>(true)

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
      setIsLoading(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      if (!time.match(/^\d{2}:\d{2}:\d{2}$/)) {
         setErrorTime('Невірний формат часу. Використовуйте HH:MM:SS.')
      } else {
         setErrorTime('')
      }
   }, [time])

   const handleClick = () => {
      const newRecord: IRecord = {
         _id: new Date().getTime().toString(),
         ...(selectedExercise?.hasReps && {
            reps: parseFloat(reps ? reps : '0'),
         }),
         ...(selectedExercise?.hasWeight && {
            weight: parseFloat(weight ? weight : '0'),
         }),
         ...(selectedExercise?.hasTime && {
            time,
         }),
         addedAt: new Date().toISOString(),
      }
      const newWorkouts = workouts.map((workout) => {
         if (workout._id !== selectedWorkout._id) return workout
         return {
            ...workout,
            exercises: workout.exercises.map((exercise) => {
               if (exercise.exercise_id !== selectedExercise._id)
                  return exercise
               return {
                  ...exercise,
                  records: [...exercise.records, newRecord],
               }
            }),
         }
      })
      dispatch(setWorkouts(newWorkouts))

      setIsModalOpen(false)
   }

   return (
      <>
         {!isLoading && (
            <>
               <div className="modal-bg">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h2>Додавання запису</h2>
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
                        onClick={handleClick}
                        disabled={selectedExercise?.hasTime && errorTime !== ''}
                     >
                        додати
                     </button>
                  </div>
               </div>
            </>
         )}
      </>
   )
}

export default AddRecordModal
