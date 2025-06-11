import { useEffect, useState } from 'react'
import type { IExercise, IRecord, IWorkoutProps } from '../interfaces'
import AddExerciseToWorkoutModal from './modals/AddExerciseToWorkoutModal'
import RemoveWorkoutModal from './modals/RemoveWorkoutModal'
import RemoveExerciseFromWorkoutModal from './modals/RemoveExerciseFromWorkoutModal'
import AddRecordModal from './modals/AddRecordModal'
import EditWorkoutModal from './modals/EditWorkoutModal'
import RemoveRecordModal from './modals/RemoveRecordModal'
import EditRecordModal from './modals/EditRecordModal'

const Workout = ({
   activeWorkout,
   setActiveWorkout,
   exercises,
   setWorkouts,
}: IWorkoutProps) => {
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
         <div className="flex w-full flex-col items-center gap-4">
            <div className="mb-2 flex w-full flex-row items-center justify-between">
               <h2 className="w-full border-b-2 border-black/70 pb-4 text-3xl font-bold">
                  {activeWorkout?.date}
                  {' - '}
                  {activeWorkout?.date &&
                     new Date(activeWorkout.date)
                        .toLocaleDateString('uk-UA', { weekday: 'long' })
                        .replace(/^./, (c) => c.toUpperCase())}
               </h2>
            </div>
            <div className="w-full rounded-lg border-2 border-gray-400 p-2 text-left text-lg font-semibold shadow-lg transition-all hover:border-gray-600 hover:shadow-xl active:border-gray-600">
               <p className="mb-4 w-full text-left text-2xl font-medium">
                  Вправи:
               </p>
               {errorExercises ? (
                  <p className="mt-1 block text-left text-red-600">
                     {errorExercises}
                  </p>
               ) : (
                  <div>
                     {activeWorkout.exercises.length === 0 ? (
                        <p className="mb-4 text-center text-lg font-medium">
                           Вправи відсутні.
                        </p>
                     ) : (
                        activeWorkout.exercises.map((exercise, index) => {
                           const exerciseInfo =
                              exercises.find(
                                 (ex) => ex._id === exercise.exercise_id
                              ) || null
                           return (
                              exerciseInfo && (
                                 <details
                                    key={index}
                                    className="details"
                                    onClick={() => {
                                       setSelectedExercise(exerciseInfo)
                                    }}
                                 >
                                    <summary className="w-full">
                                       <div className="flex w-full items-center justify-between">
                                          {exerciseInfo.name}
                                          <button
                                             className="bg-red-500 px-6 py-2 text-sm hover:bg-red-800 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800"
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
                                    {exercise.records.length === 0 ? (
                                       <p className="my-4 block text-left">
                                          Записи відсутні.
                                       </p>
                                    ) : (
                                       <div className="mb-4">
                                          <div className="mt-4 flex w-full flex-row items-center justify-between">
                                             <p className="w-1/10 overflow-x-auto border text-center">
                                                №
                                             </p>
                                             {exerciseInfo?.hasReps && (
                                                <p className="flex-1 overflow-x-auto border text-center">
                                                   Повтори
                                                </p>
                                             )}
                                             {exerciseInfo?.hasWeight && (
                                                <p className="flex-1 overflow-x-auto border text-center">
                                                   Вага (кг)
                                                </p>
                                             )}
                                             {exerciseInfo?.hasTime && (
                                                <p className="flex-1 overflow-x-auto border text-center">
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
                                                      <div className="flex w-full flex-row items-center justify-between">
                                                         <p className="w-1/10 overflow-x-auto border text-center">
                                                            {id + 1}
                                                         </p>
                                                         {exerciseInfo?.hasReps && (
                                                            <p className="flex-1 overflow-x-auto border text-center">
                                                               {record.reps
                                                                  ? record.reps
                                                                  : '-'}
                                                            </p>
                                                         )}
                                                         {exerciseInfo?.hasWeight && (
                                                            <p className="flex-1 overflow-x-auto border text-center">
                                                               {record.weight
                                                                  ? record.weight
                                                                  : '-'}
                                                            </p>
                                                         )}
                                                         {exerciseInfo?.hasTime && (
                                                            <p className="flex-1 overflow-x-auto border text-center">
                                                               {record.time
                                                                  ? record.time
                                                                  : '-'}
                                                            </p>
                                                         )}
                                                      </div>
                                                   </summary>
                                                   <div className="flex w-full flex-row items-center justify-between">
                                                      <button
                                                         className="w-full rounded-none bg-yellow-500 px-4 py-1 hover:bg-yellow-600 active:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-600"
                                                         onClick={() => {
                                                            setIsEditRecordModalOpen(
                                                               true
                                                            )
                                                         }}
                                                      >
                                                         редагувати
                                                      </button>
                                                      <button
                                                         className="w-full rounded-none bg-red-500 px-4 py-1 hover:bg-red-800 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800"
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
                                       className="w-full bg-green-500 px-4 py-2 hover:bg-green-600 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-600 disabled:opacity-50"
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
                        className="w-full bg-green-500 p-4 hover:bg-green-600 active:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-600 disabled:opacity-50"
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
            <button
               className="w-full bg-yellow-500 p-4 hover:bg-yellow-600 active:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-600 disabled:opacity-50"
               onClick={() => {
                  setIsEditWorkoutModalOpen(true)
               }}
            >
               редагувати тренування
            </button>
            <button
               className="w-full bg-red-500 p-4 hover:bg-red-800 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800"
               onClick={() => {
                  setIsRemoveWorkoutModalOpen(true)
               }}
            >
               видалити тренування
            </button>
            <button
               className="w-full bg-blue-500 p-4 hover:bg-blue-600 active:bg-blue-600"
               onClick={() => {
                  setActiveWorkout(null)
               }}
            >
               назад
            </button>
         </div>

         {isRemoveWorkoutModalOpen && (
            <RemoveWorkoutModal
               setIsRemoveWorkoutModalOpen={setIsRemoveWorkoutModalOpen}
               setWorkouts={setWorkouts}
               activeWorkout={activeWorkout}
            />
         )}
         {isEditWorkoutModalOpen && (
            <EditWorkoutModal
               setIsEditWorkoutModalOpen={setIsEditWorkoutModalOpen}
               setWorkouts={setWorkouts}
               activeWorkout={activeWorkout}
            />
         )}
         {isAddExerciseToWorkoutModalOpen && (
            <AddExerciseToWorkoutModal
               setAddExerciseToWorkoutModalOpen={
                  setIsAddExerciseToWorkoutModalOpen
               }
               exercises={exercises}
               setWorkouts={setWorkouts}
               workout={activeWorkout}
            />
         )}
         {isRemoveExerciseFromWorkoutModalOpen && selectedExercise && (
            <RemoveExerciseFromWorkoutModal
               setIsRemoveExerciseFromWorkoutModalOpen={
                  setIsRemoveExerciseFromWorkoutModalOpen
               }
               setWorkouts={setWorkouts}
               activeWorkout={activeWorkout}
               selectedExercise={selectedExercise}
            />
         )}
         {isAddRecordModalOpen && selectedExercise && (
            <AddRecordModal
               setIsAddRecordModalOpen={setIsAddRecordModalOpen}
               selectedExercise={selectedExercise}
               setWorkouts={setWorkouts}
               selectedWorkout={activeWorkout}
            />
         )}
         {isEditRecordModalOpen && selectedExercise && selectedRecord && (
            <EditRecordModal
               setIsEditRecordModalOpen={setIsEditRecordModalOpen}
               setWorkouts={setWorkouts}
               selectedWorkout={activeWorkout}
               selectedExercise={selectedExercise}
               selectedRecord={selectedRecord}
            />
         )}
         {isRemoveRecordModalOpen && selectedExercise && selectedRecord && (
            <RemoveRecordModal
               setIsRemoveRecordModalOpen={setIsRemoveRecordModalOpen}
               setWorkouts={setWorkouts}
               selectedWorkout={activeWorkout}
               selectedExercise={selectedExercise}
               selectedRecord={selectedRecord}
            />
         )}
      </>
   )
}

export default Workout
