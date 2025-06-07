import type { IListOfWorkoutsProps, IRecord } from '../interfaces'

const ListOfWorkouts = ({ workouts, exercises }: IListOfWorkoutsProps) => {
   return (
      <div className="mt-4 flex w-full flex-col gap-2">
         {workouts.length === 0 ? (
            exercises.length === 0 ? (
               <p>Додайте хоч одну вправу для додавання тренувань.</p>
            ) : (
               <p>Записи тренувань відсутні.</p>
            )
         ) : (
            workouts.map((training, index) =>
               training.exercises ? (
                  <div
                     key={index}
                     className="mb-4 w-full rounded-lg border-2 border-gray-400 p-2 text-left text-lg font-semibold shadow-lg transition-all hover:border-gray-600 hover:bg-gray-400/50 hover:shadow-xl active:border-gray-500 active:bg-gray-400/50"
                  >
                     <div className="mb-2 flex w-full flex-row items-center justify-between">
                        <p>
                           {training.date}
                           {' - '}
                           {new Date(training.date)
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
                     {training.exercises.map((trainingExercise) => {
                        const exercise = exercises.find(
                           (exerciseItem) =>
                              exerciseItem._id === trainingExercise.exercise_id
                        ) || {
                           name: 'Невідома вправа',
                           _id: 'unknown',
                           hasReps: false,
                           hasWeight: false,
                           hasTime: false,
                        }
                        return (
                           <details key={exercise._id} className="mb-2 w-full">
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
                              {trainingExercise.records.map(
                                 (record: IRecord, id: number) => (
                                    <div
                                       key={exercise._id + id + 1}
                                       className="flex w-full flex-row items-center justify-between"
                                    >
                                       <p className="w-1/10 overflow-x-auto border text-center">
                                          {id + 1}
                                       </p>
                                       <p className="w-3/10 overflow-x-auto border text-center">
                                          {exercise.hasReps ? record.reps : '-'}
                                       </p>
                                       <p className="w-3/10 overflow-x-auto border text-center">
                                          {exercise.hasWeight
                                             ? record.weight
                                             : '-'}
                                       </p>
                                       <p className="w-3/10 overflow-x-auto border text-center">
                                          {exercise.hasTime ? record.time : '-'}
                                       </p>
                                    </div>
                                 )
                              )}
                           </details>
                        )
                     })}
                  </div>
               ) : null
            )
         )}
      </div>
   )
}

export default ListOfWorkouts
