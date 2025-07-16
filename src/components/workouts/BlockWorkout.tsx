import type { IBlockWorkoutProps, IRecord } from '../../interfaces'

const BlockWorkout = ({ workout, exercises, clicker }: IBlockWorkoutProps) => {
   return (
      <div className="block-border">
         <div className="mb-2 flex w-full flex-row items-center justify-between">
            <p className="pr-3">
               {workout.date}
               {' - '}
               {new Date(workout.date)
                  .toLocaleDateString('uk-UA', { weekday: 'long' })
                  .replace(/^./, (c) => c.toUpperCase())}
            </p>
            <button
               className="button-edit button-modal w-1/3 truncate text-sm max-[400px]:text-xs"
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
                  <details key={exerciseInfo._id} className="details">
                     <summary className="font-medium">
                        {exerciseInfo.name}
                     </summary>
                     {wex.records.length === 0 ? (
                        <p className="mt-4 block text-left">Записи відсутні.</p>
                     ) : (
                        <>
                           <div className="table-block-row header mt-4">
                              <p className="table-block-cell table-block-cell-number">
                                 №
                              </p>
                              {exerciseInfo.hasWeight && (
                                 <p className="table-block-cell table-block-cell-text">
                                    Вага
                                 </p>
                              )}
                              {exerciseInfo.hasReps && (
                                 <p className="table-block-cell table-block-cell-text">
                                    Повтори
                                 </p>
                              )}
                              {exerciseInfo.hasTime && (
                                 <p className="table-block-cell table-block-cell-text">
                                    Час
                                 </p>
                              )}
                           </div>
                           {wex.records.map((record: IRecord, id: number) => (
                              <div
                                 key={exerciseInfo._id + id + 1}
                                 className="table-block-row"
                              >
                                 <p className="table-block-cell table-block-cell-number">
                                    {id + 1}
                                 </p>
                                 {exerciseInfo.hasWeight && (
                                    <p className="table-block-cell table-block-cell-text">
                                       {record.weight ? record.weight : '-'}
                                    </p>
                                 )}
                                 {exerciseInfo.hasReps && (
                                    <p className="table-block-cell table-block-cell-text">
                                       {record.reps ? record.reps : '-'}
                                    </p>
                                 )}
                                 {exerciseInfo.hasTime && (
                                    <p className="table-block-cell table-block-cell-text">
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
