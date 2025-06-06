import type { IListOfWorkoutsProps } from '../interfaces'

const ListOfWorkouts = ({ workouts, exercises }: IListOfWorkoutsProps) => {
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
                  <p className="mb-2">
                     {workout.date}{' '}
                     {new Date(workout.date)
                        .toLocaleDateString('uk-UA', { weekday: 'long' })
                        .replace(/^./, (c) => c.toUpperCase())}
                  </p>
                  <div className="flex w-full flex-row items-center justify-between">
                     <p className="w-1/10 overflow-x-auto rounded-tl-lg border text-center">
                        №
                     </p>
                     <p className="w-3/10 overflow-x-auto border text-center">
                        Назва
                     </p>
                     <p className="w-2/10 overflow-x-auto border text-center">
                        Повтори
                     </p>
                     <p className="w-2/10 overflow-x-auto border text-center">
                        Вага
                     </p>
                     <p className="w-2/10 overflow-x-auto rounded-tr-lg border text-center">
                        Час
                     </p>
                  </div>
                  {workout.workouts.map((workoutItem, id) => {
                     const exercise = exercises.find(
                        (exerciseItem) =>
                           exerciseItem._id === workoutItem.exercise_id
                     ) || {
                        name: 'Невідома вправа',
                        _id: 'unknown',
                        hasReps: false,
                        hasWeight: false,
                        hasTime: false,
                     }
                     return (
                        <div
                           className="flex w-full flex-row items-center justify-between"
                           key={workoutItem._id}
                        >
                           <p className="w-1/10 overflow-x-auto border text-center">
                              {Number(id + 1)}
                           </p>
                           <p className="w-3/10 overflow-x-auto border text-center whitespace-nowrap">
                              {exercise.name}
                           </p>
                           <p className="w-2/10 overflow-x-auto border text-center">
                              {exercise.hasReps ? workoutItem.reps : '-'}
                           </p>
                           <p className="w-2/10 overflow-x-auto border text-center">
                              {exercise.hasWeight ? workoutItem.weight : '-'}
                           </p>
                           <p className="w-2/10 overflow-x-auto border text-center">
                              {exercise.hasTime ? workoutItem.time : '-'}
                           </p>
                        </div>
                     )
                  })}
               </div>
            ))
         )}
      </div>
   )
}

export default ListOfWorkouts
