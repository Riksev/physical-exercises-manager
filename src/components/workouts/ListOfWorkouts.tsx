import { useAppSelector } from '../../app/hooks'
import type { IWorkout } from '../../interfaces'
import BlockWorkout from './BlockWorkout'

interface IListOfWorkoutsProps {
   workouts: IWorkout[]
   clicker: (workout: IWorkout) => void
}

const ListOfWorkouts = ({ workouts, clicker }: IListOfWorkoutsProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)

   return (
      <div className="mt-2 flex w-full flex-col gap-4">
         {workouts.length === 0 ? (
            exercises.length === 0 ? (
               <p>
                  Перейдіть у "ВПРАВИ" та створіть хоч одну вправу для додавання
                  тренувань.
               </p>
            ) : (
               <p>Записи тренувань відсутні.</p>
            )
         ) : (
            workouts.map((training, index) => (
               <BlockWorkout key={index} workout={training} clicker={clicker} />
            ))
         )}
      </div>
   )
}

export default ListOfWorkouts
