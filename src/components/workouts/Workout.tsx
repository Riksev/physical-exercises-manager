import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IModal, IWorkout } from '../../interfaces'
import WorkoutStatistics from './WorkoutStatistics'
import { useAppSelector } from '../../app/hooks'

interface IWorkoutProps {
   activeWorkout: IWorkout
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   setModal: Dispatch<SetStateAction<IModal | null>>
   modal: IModal | null
}

const Workout = ({
   activeWorkout,
   setActiveWorkout,
   setModal,
   modal,
}: IWorkoutProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)

   const [errorExercises, setErrorExercises] = useState<string>('')

   useEffect(() => {
      if (exercises.length === 0) {
         setErrorExercises('Вправи відсутні. Будь ласка, додайте вправи.')
      } else {
         setErrorExercises('')
      }
   }, [exercises])

   return (
      <div className="app-page">
         <h2 className="horizontal-line title">
            {activeWorkout?.date}
            {' - '}
            {activeWorkout?.date &&
               new Date(activeWorkout.date)
                  .toLocaleDateString('uk-UA', { weekday: 'long' })
                  .replace(/^./, (c) => c.toUpperCase())}
         </h2>
         <div className="flex w-full flex-col items-center gap-4">
            <div className="block-border">
               <p className="mb-4 w-full text-left text-2xl font-medium">
                  Вправи:
               </p>
               {errorExercises ? (
                  <p className="error-info">{errorExercises}</p>
               ) : (
                  <div>
                     {activeWorkout.exercises.length === 0 ? (
                        <p className="error-info mb-4 text-center">
                           Вправи відсутні.
                        </p>
                     ) : (
                        activeWorkout.exercises.map((exercise, index) => {
                           const exerciseInfo =
                              exercises.find(
                                 (ex) => ex._id === exercise.exercise_id
                              ) || null
                           const exerciseParams =
                              exerciseInfo?.hasReps ||
                              exerciseInfo?.hasWeight ||
                              exerciseInfo?.hasTime
                           return (
                              exerciseInfo && (
                                 <details key={index} className="details">
                                    <summary className="font-medium">
                                       <div className="flex w-full items-center justify-between gap-x-2">
                                          {exerciseInfo.name}
                                          <button
                                             className="button-delete px-6 py-2 text-sm"
                                             onClick={() => {
                                                setModal({
                                                   action: 'delete',
                                                   item: 'exerciseFromWorkout',
                                                   data: {
                                                      activeWorkout,
                                                      selectedExercise:
                                                         exerciseInfo,
                                                   },
                                                })
                                             }}
                                          >
                                             видалити
                                          </button>
                                       </div>
                                    </summary>
                                    <h2 className="horizontal-line"></h2>
                                    {exercise.records.length === 0 ||
                                    !exerciseParams ? (
                                       <p className="my-4 block text-left">
                                          {!exerciseParams
                                             ? 'Вправа не містить параметрів.'
                                             : 'Записи відсутні.'}
                                       </p>
                                    ) : (
                                       <div className="my-4">
                                          <div className="table-block-row header">
                                             <p className="table-block-cell table-block-cell-number">
                                                №
                                             </p>
                                             {exerciseInfo?.hasWeight && (
                                                <p className="table-block-cell table-block-cell-text">
                                                   Вага
                                                </p>
                                             )}
                                             {exerciseInfo?.hasReps && (
                                                <p className="table-block-cell table-block-cell-text">
                                                   Повтори
                                                </p>
                                             )}
                                             {exerciseInfo?.hasTime && (
                                                <p className="table-block-cell table-block-cell-text">
                                                   Час
                                                </p>
                                             )}
                                          </div>
                                          {exercise.records.map(
                                             (record, id) => (
                                                <details key={id}>
                                                   <summary>
                                                      <div className="table-block-row">
                                                         <p className="table-block-cell table-block-cell-number">
                                                            {id + 1}
                                                         </p>
                                                         {exerciseInfo?.hasWeight && (
                                                            <p className="table-block-cell table-block-cell-text">
                                                               {record.weight
                                                                  ? record.weight
                                                                  : '-'}
                                                            </p>
                                                         )}
                                                         {exerciseInfo?.hasReps && (
                                                            <p className="table-block-cell table-block-cell-text">
                                                               {record.reps
                                                                  ? record.reps
                                                                  : '-'}
                                                            </p>
                                                         )}
                                                         {exerciseInfo?.hasTime && (
                                                            <p className="table-block-cell table-block-cell-text">
                                                               {record.time
                                                                  ? record.time
                                                                  : '-'}
                                                            </p>
                                                         )}
                                                      </div>
                                                   </summary>
                                                   <div className="flex w-full flex-row items-center justify-between">
                                                      <button
                                                         className="button-edit w-1/2 truncate rounded-none px-4 py-1 max-[400px]:text-sm"
                                                         onClick={() => {
                                                            setModal({
                                                               action: 'edit',
                                                               item: 'record',
                                                               data: {
                                                                  activeWorkout,
                                                                  selectedExercise:
                                                                     exerciseInfo,
                                                                  selectedRecord:
                                                                     record,
                                                               },
                                                            })
                                                         }}
                                                      >
                                                         редагувати
                                                      </button>
                                                      <button
                                                         className="button-delete w-1/2 truncate rounded-none px-4 py-1 max-[400px]:text-sm"
                                                         onClick={() => {
                                                            setModal({
                                                               action: 'delete',
                                                               item: 'record',
                                                               data: {
                                                                  activeWorkout,
                                                                  selectedExercise:
                                                                     exerciseInfo,
                                                                  selectedRecord:
                                                                     record,
                                                               },
                                                            })
                                                         }}
                                                      >
                                                         видалити
                                                      </button>
                                                   </div>
                                                </details>
                                             )
                                          )}
                                       </div>
                                    )}
                                    <button
                                       className={`button-add button-modal ${!exerciseParams ? 'hidden' : ''}`}
                                       onClick={() => {
                                          setModal({
                                             action: 'add',
                                             item: 'record',
                                             data: {
                                                activeWorkout,
                                                selectedExercise: exerciseInfo,
                                             },
                                          })
                                       }}
                                    >
                                       додати
                                    </button>
                                 </details>
                              )
                           )
                        })
                     )}
                     <button
                        className="button-add button-full"
                        onClick={() => {
                           setModal({
                              action: 'add',
                              item: 'exerciseFromWorkout',
                              data: { activeWorkout },
                           })
                        }}
                        disabled={errorExercises !== ''}
                     >
                        додати
                     </button>
                  </div>
               )}
            </div>
            <WorkoutStatistics
               activeWorkout={activeWorkout}
               isAnyModalOpen={modal !== null}
            />
            <button
               className="button-edit button-full"
               onClick={() => {
                  setModal({
                     action: 'edit',
                     item: 'workout',
                     data: { activeWorkout },
                  })
               }}
            >
               редагувати
            </button>
            <button
               className="button-delete button-full"
               onClick={() => {
                  setModal({
                     action: 'delete',
                     item: 'workout',
                     data: { activeWorkout },
                  })
               }}
            >
               видалити
            </button>
            <button
               className="button-action button-full"
               onClick={() => {
                  setActiveWorkout(null)
               }}
            >
               назад
            </button>
         </div>
      </div>
   )
}

export default Workout
