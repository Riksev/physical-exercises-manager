import type { IListOfWorkoutsProps, IWorkout } from '../interfaces'

const ListOfWorkouts = ({ workouts, exercises }: IListOfWorkoutsProps) => {
   const setsOfExercises: Map<string, Map<string, IWorkout[]>> = new Map()

   return (
      <div className="mt-4 flex w-full flex-col gap-2">
         {workouts.length === 0 ? (
            <p>Записи відсутні.</p>
         ) : (
            workouts.map((workout, index) => (
               <div
                  key={index}
                  className="mb-4 w-full rounded-lg border-2 border-gray-400 p-2 text-left text-lg font-semibold shadow-lg transition-all hover:border-gray-600 hover:bg-gray-400/50 hover:shadow-xl active:border-gray-500 active:bg-gray-400/50"
               >
                  <div className="mb-2 flex w-full flex-row items-center justify-between">
                     <p>
                        {workout.date}
                        {' - '}
                        {new Date(workout.date)
                           .toLocaleDateString('uk-UA', { weekday: 'long' })
                           .replace(/^./, (c) => c.toUpperCase())}
                     </p>
                     <button
                        className="w-1/3 bg-yellow-500 px-4 py-2 text-sm hover:bg-yellow-600 active:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-yellow-600 disabled:opacity-50"
                        onClick={() => {}}
                        disabled
                     >
                        редагувати
                     </button>
                  </div>
                  {workout.workouts.map((workoutItem) => {
                     const exerciseMap =
                        setsOfExercises.get(workout.date) ||
                        new Map<string, IWorkout[]>()
                     if (!exerciseMap.has(workoutItem.exercise_id)) {
                        exerciseMap.set(workoutItem.exercise_id, [workoutItem])
                     } else {
                        exerciseMap
                           .get(workoutItem.exercise_id)
                           ?.push(workoutItem)
                     }
                     setsOfExercises.set(workout.date, exerciseMap)
                     console.log('setsOfExercises:', setsOfExercises)
                     return null
                  })}
                  {Array.from(
                     setsOfExercises.get(workout.date)?.entries() ?? new Map()
                  ).map(([exerciseId, workoutItems]: [string, IWorkout[]]) => {
                     const exercise = exercises.find(
                        (exerciseItem) => exerciseItem._id === exerciseId
                     ) || {
                        name: 'Невідома вправа',
                        _id: 'unknown',
                        hasReps: false,
                        hasWeight: false,
                        hasTime: false,
                     }
                     return (
                        <details key={exerciseId} className="mb-2 w-full">
                           <summary className="w-full cursor-pointer rounded-lg border-2 border-gray-400 bg-gray-300 p-2 text-left text-lg font-semibold shadow-lg transition-all hover:border-gray-600 hover:bg-gray-400/50 hover:shadow-xl active:border-gray-500 active:bg-gray-400/50">
                              {exercise.name}
                           </summary>
                           <div className="flex w-full flex-row items-center justify-between">
                              <p className="w-1/10 overflow-x-auto border text-center">
                                 №
                              </p>
                              <p className="w-3/10 overflow-x-auto border text-center">
                                 Повтори
                              </p>
                              <p className="w-3/10 overflow-x-auto border text-center">
                                 Вага
                              </p>
                              <p className="w-3/10 overflow-x-auto border text-center">
                                 Час
                              </p>
                           </div>
                           {workoutItems.map((item: IWorkout, id: number) => (
                              <div
                                 key={item._id + id + 1}
                                 className="flex w-full flex-row items-center justify-between"
                              >
                                 <p className="w-1/10 overflow-x-auto border text-center">
                                    {id + 1}
                                 </p>
                                 <p className="w-3/10 overflow-x-auto border text-center">
                                    {exercise.hasReps ? item.reps : '-'}
                                 </p>
                                 <p className="w-3/10 overflow-x-auto border text-center">
                                    {exercise.hasWeight ? item.weight : '-'}
                                 </p>
                                 <p className="w-3/10 overflow-x-auto border text-center">
                                    {exercise.hasTime ? item.time : '-'}
                                 </p>
                              </div>
                           ))}
                        </details>
                     )
                  })}
               </div>
            ))
         )}
      </div>
   )
}
{
   /* // 		<div
                     // 		className="flex w-full flex-row items-center justify-between"
                     // 		key={workoutItem._id}
                     //  >
                     // 		{/* <p className="w-1/10 overflow-x-auto border text-center">
                     // 			 {setsOfExercises.get(workoutItem.exercise_id)}
                     // 		</p>
                     // 		<p className="w-3/10 overflow-x-auto border text-center whitespace-nowrap">
                     // 			 {exercise.name}
                     // 		</p>
                     // 		<p className="w-2/10 overflow-x-auto border text-center">
                     // 			 {exercise.hasReps ? workoutItem.reps : '-'}
                     // 		</p>
                     // 		<p className="w-2/10 overflow-x-auto border text-center">
                     // 			 {exercise.hasWeight ? workoutItem.weight : '-'}
                     // 		</p>
                     // 		<p className="w-2/10 overflow-x-auto border text-center">
                     // 			 {exercise.hasTime ? workoutItem.time : '-'}
                     // 		</p> 
										 // </div>*/
}
{
   /* // Array.from(setsOfExercises.entries()).map(
                     //            ([exerciseId, workoutItems]) => {
                     //               const exercise = exercises.find(
                     //                  (exerciseItem) =>
                     //                     exerciseItem._id === exerciseId
                     //               ) || {
                     //                  name: 'Невідома вправа',
                     //                  _id: 'unknown',
                     //                  hasReps: false,
                     //                  hasWeight: false,
                     //                  hasTime: false,
                     //               }
                     //               return (
                     //                  <details>
                     //                     <summary>{exercise.name}</summary>
                     //                     <div className="flex w-full flex-row items-center justify-between">
                     //                        <p className="w-1/10 overflow-x-auto rounded-tl-lg border text-center">
                     //                           №
                     //                        </p>
                     //                        <p className="w-3/10 overflow-x-auto border text-center">
                     //                           Назва
                     //                        </p>
                     //                        <p className="w-2/10 overflow-x-auto border text-center">
                     //                           Повтори
                     //                        </p>
                     //                        <p className="w-2/10 overflow-x-auto border text-center">
                     //                           Вага
                     //                        </p>
                     //                        <p className="w-2/10 overflow-x-auto rounded-tr-lg border text-center">
                     //                           Час
                     //                        </p>
                     //                     </div>
                     //                  </details>
                     //               )
                     //            }
                     //         ) */
}

export default ListOfWorkouts
