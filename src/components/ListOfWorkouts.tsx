import type { IListOfWorkoutsProps } from '../interfaces'
import BlockWorkout from './BlockWorkout'

const ListOfWorkouts = ({
   workouts,
   exercises,
   clicker,
}: IListOfWorkoutsProps) => {
   return (
      <div className="mt-4 flex w-full flex-col gap-2">
         {workouts.length === 0 ? (
            exercises.length === 0 ? (
               <p>Додайте хоч одну вправу для додавання тренувань.</p>
            ) : (
               <p>Записи тренувань відсутні.</p>
            )
         ) : (
            workouts.map((training, index) => (
               <BlockWorkout
                  key={index}
                  workout={training}
                  exercises={exercises}
                  clicker={clicker}
               />
            ))
         )}
      </div>
   )
}

export default ListOfWorkouts
