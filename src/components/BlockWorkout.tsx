import type { IBlockWorkoutProps, IRecord } from '../interfaces'

const BlockWorkout = ({ workout, exercises, clicker }: IBlockWorkoutProps) => {
   return (
      <div className="mb-4 w-full rounded-lg border-2 border-gray-400 p-2 text-left text-lg font-semibold shadow-lg transition-all hover:border-gray-600 hover:shadow-xl active:border-gray-600">
         <div className="mb-2 flex w-full flex-row items-center justify-between">
            <p>
               {workout.date}
               {' - '}
               {new Date(workout.date)
                  .toLocaleDateString('uk-UA', { weekday: 'long' })
                  .replace(/^./, (c) => c.toUpperCase())}
            </p>
            <button
               className="w-1/3 bg-yellow-500 px-4 py-2 text-center text-sm hover:bg-yellow-600 active:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-600 disabled:opacity-50"
               onClick={() => {
                  clicker(workout)
               }}
            >
               заповнити
            </button>
         </div>
         {workout.exercises.map((wex) => {
            const exerciseInfo =
               exercises.find((ex) => ex._id === wex.exercise_id) || null
            if (exerciseInfo) {
               return (
                  <details
                     key={exerciseInfo._id}
                     className="mb-2 w-full cursor-pointer rounded-lg border-2 border-gray-400 bg-gray-300 p-2 text-left text-lg font-semibold shadow-lg transition-all hover:border-gray-600 hover:bg-gray-400/50 hover:shadow-xl active:border-gray-500 active:bg-gray-400/50"
                  >
                     <summary>{exerciseInfo.name}</summary>
                     {wex.records.length === 0 ? (
                        <p className="mt-4 block text-left">Записи відсутні.</p>
                     ) : (
                        <>
                           <div className="mt-4 flex w-full flex-row items-center justify-between">
                              <p className="w-1/10 overflow-x-auto border text-center">
                                 №
                              </p>
                              {exerciseInfo.hasReps && (
                                 <p className="flex-1 overflow-x-auto border text-center">
                                    Повтори
                                 </p>
                              )}
                              {exerciseInfo.hasWeight && (
                                 <p className="flex-1 overflow-x-auto border text-center">
                                    Вага (кг)
                                 </p>
                              )}
                              {exerciseInfo.hasTime && (
                                 <p className="flex-1 overflow-x-auto border text-center">
                                    Час
                                 </p>
                              )}
                           </div>
                           {wex.records.map((record: IRecord, id: number) => (
                              <div
                                 key={exerciseInfo._id + id + 1}
                                 className="flex w-full flex-row items-center justify-between"
                              >
                                 <p className="w-1/10 overflow-x-auto border text-center">
                                    {id + 1}
                                 </p>
                                 {exerciseInfo.hasReps && (
                                    <p className="flex-1 overflow-x-auto border text-center">
                                       {record.reps ? record.reps : '-'}
                                    </p>
                                 )}
                                 {exerciseInfo.hasWeight && (
                                    <p className="flex-1 overflow-x-auto border text-center">
                                       {record.weight ? record.weight : '-'}
                                    </p>
                                 )}
                                 {exerciseInfo.hasTime && (
                                    <p className="flex-1 overflow-x-auto border text-center">
                                       {record.time ? record.time : '-'}
                                    </p>
                                 )}
                              </div>
                           ))}
                        </>
                     )}
                  </details>
               )
            }
         })}
      </div>
   )
}

export default BlockWorkout
