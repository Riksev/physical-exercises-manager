import type { IListOfExercisesProps } from '../interfaces'
import BlockExercise from './BlockExercise'

const ListOfExercises = ({
   exercises,
   clicker,
   showAll = false,
}: IListOfExercisesProps) => {
   return (
      <div className="flex w-full flex-col gap-4">
         {showAll && (
            <BlockExercise
               key={'all'}
               exercise={{
                  _id: 'all',
                  name: 'Всі вправи',
               }}
               clicker={clicker}
            />
         )}
         {exercises.map((exercise) => (
            <BlockExercise
               key={exercise._id}
               exercise={exercise}
               clicker={clicker}
            />
         ))}
         {exercises.length === 0 && !showAll && (
            <p className="text-xl font-semibold text-gray-700">
               Вправ не знайдено.
            </p>
         )}
      </div>
   )
}

export default ListOfExercises
