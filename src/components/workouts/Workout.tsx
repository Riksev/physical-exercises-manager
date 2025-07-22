import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IExercise, IRecord, IWorkout } from '../../interfaces'
import AddExerciseToWorkoutModal from '../modals/add/AddExerciseToWorkoutModal'
import RemoveWorkoutModal from '../modals/remove/RemoveWorkoutModal'
import RemoveExerciseFromWorkoutModal from '../modals/remove/RemoveExerciseFromWorkoutModal'
import AddRecordModal from '../modals/add/AddRecordModal'
import EditWorkoutModal from '../modals/edit/EditWorkoutModal'
import RemoveRecordModal from '../modals/remove/RemoveRecordModal'
import EditRecordModal from '../modals/edit/EditRecordModal'
import WorkoutStatistics from './WorkoutStatistics'
import { useAppSelector } from '../../app/hooks'

interface IWorkoutProps {
   activeWorkout: IWorkout
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
}

const Workout = ({ activeWorkout, setActiveWorkout }: IWorkoutProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)

   const [isRemoveWorkoutModalOpen, setIsRemoveWorkoutModalOpen] =
      useState<boolean>(false)
   const [isEditWorkoutModalOpen, setIsEditWorkoutModalOpen] =
      useState<boolean>(false)

   const [isAddExerciseToWorkoutModalOpen, setIsAddExerciseToWorkoutModalOpen] =
      useState<boolean>(false)
   const [
      isRemoveExerciseFromWorkoutModalOpen,
      setIsRemoveExerciseFromWorkoutModalOpen,
   ] = useState<boolean>(false)

   const [isAddRecordModalOpen, setIsAddRecordModalOpen] =
      useState<boolean>(false)
   const [isEditRecordModalOpen, setIsEditRecordModalOpen] =
      useState<boolean>(false)
   const [isRemoveRecordModalOpen, setIsRemoveRecordModalOpen] =
      useState<boolean>(false)

   const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
      null
   )
   const [selectedRecord, setSelectedRecord] = useState<IRecord | null>(null)

   const [errorExercises, setErrorExercises] = useState<string>('')

   useEffect(() => {
      if (exercises.length === 0) {
         setErrorExercises('Вправи відсутні. Будь ласка, додайте вправи.')
      } else {
         setErrorExercises('')
      }
   }, [exercises])

   return (
      <>
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
                                 <details
                                    key={index}
                                    className="details"
                                    onClick={() => {
                                       setSelectedExercise(exerciseInfo)
                                    }}
                                 >
                                    <summary className="font-medium">
                                       <div className="flex w-full items-center justify-between gap-x-2">
                                          {exerciseInfo.name}
                                          <button
                                             className="button-remove px-6 py-2 text-sm"
                                             onClick={() => {
                                                setIsRemoveExerciseFromWorkoutModalOpen(
                                                   true
                                                )
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
                                                <details
                                                   key={id}
                                                   onClick={() => {
                                                      setSelectedRecord(record)
                                                   }}
                                                >
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
                                                            setIsEditRecordModalOpen(
                                                               true
                                                            )
                                                         }}
                                                      >
                                                         редагувати
                                                      </button>
                                                      <button
                                                         className="button-remove w-1/2 truncate rounded-none px-4 py-1 max-[400px]:text-sm"
                                                         onClick={() => {
                                                            setIsRemoveRecordModalOpen(
                                                               true
                                                            )
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
                                          setIsAddRecordModalOpen(true)
                                       }}
                                    >
                                       додати запис
                                    </button>
                                 </details>
                              )
                           )
                        })
                     )}
                     <button
                        className="button-add button-full"
                        onClick={() => {
                           setIsAddExerciseToWorkoutModalOpen(true)
                        }}
                        disabled={errorExercises !== ''}
                     >
                        додати вправу
                     </button>
                  </div>
               )}
            </div>
            <WorkoutStatistics
               activeWorkout={activeWorkout}
               isAnyModalOpen={
                  isAddRecordModalOpen ||
                  isEditRecordModalOpen ||
                  isRemoveRecordModalOpen ||
                  isAddExerciseToWorkoutModalOpen ||
                  isRemoveExerciseFromWorkoutModalOpen
               }
            />
            <button
               className="button-edit button-full"
               onClick={() => {
                  setIsEditWorkoutModalOpen(true)
               }}
            >
               редагувати тренування
            </button>
            <button
               className="button-remove button-full"
               onClick={() => {
                  setIsRemoveWorkoutModalOpen(true)
               }}
            >
               видалити тренування
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

         {isRemoveWorkoutModalOpen && (
            <RemoveWorkoutModal
               setIsModalOpen={setIsRemoveWorkoutModalOpen}
               activeWorkout={activeWorkout}
            />
         )}
         {isEditWorkoutModalOpen && (
            <EditWorkoutModal
               setIsModalOpen={setIsEditWorkoutModalOpen}
               activeWorkout={activeWorkout}
            />
         )}
         {isAddExerciseToWorkoutModalOpen && (
            <AddExerciseToWorkoutModal
               setIsModalOpen={setIsAddExerciseToWorkoutModalOpen}
               workout={activeWorkout}
            />
         )}
         {isRemoveExerciseFromWorkoutModalOpen && selectedExercise && (
            <RemoveExerciseFromWorkoutModal
               setIsModalOpen={setIsRemoveExerciseFromWorkoutModalOpen}
               activeWorkout={activeWorkout}
               selectedExercise={selectedExercise}
            />
         )}
         {isAddRecordModalOpen && selectedExercise && (
            <AddRecordModal
               setIsModalOpen={setIsAddRecordModalOpen}
               selectedExercise={selectedExercise}
               selectedWorkout={activeWorkout}
            />
         )}
         {isEditRecordModalOpen && selectedExercise && selectedRecord && (
            <EditRecordModal
               setIsModalOpen={setIsEditRecordModalOpen}
               selectedWorkout={activeWorkout}
               selectedExercise={selectedExercise}
               selectedRecord={selectedRecord}
            />
         )}
         {isRemoveRecordModalOpen && selectedExercise && selectedRecord && (
            <RemoveRecordModal
               setIsModalOpen={setIsRemoveRecordModalOpen}
               selectedWorkout={activeWorkout}
               selectedExercise={selectedExercise}
               selectedRecord={selectedRecord}
            />
         )}
      </>
   )
}

export default Workout
