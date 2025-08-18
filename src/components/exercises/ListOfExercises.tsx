import { useTranslation } from 'react-i18next'
import type { IExercise } from '../../interfaces'
import BlockExercise from './BlockExercise'

interface IListOfExercisesProps {
   exercises: IExercise[]
   clicker?: (exercise: IExercise) => void
   showAll?: boolean
}

const ListOfExercises = ({
   exercises,
   clicker,
   showAll = false,
}: IListOfExercisesProps) => {
   const { t } = useTranslation()

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
               {t('exercises.noExercises')}
            </p>
         )}
      </div>
   )
}

export default ListOfExercises
