import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import type { IWorkout } from '../../interfaces'
import BlockWorkout from './BlockWorkout'

interface IListOfWorkoutsProps {
   workouts: IWorkout[]
   clicker: (workout: IWorkout) => void
   controlOrder?: boolean
}

const ListOfWorkouts = ({
   workouts,
   clicker,
   controlOrder,
}: IListOfWorkoutsProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const { t } = useTranslation()

   return (
      <div className="mt-2 flex w-full flex-col gap-4">
         {workouts.length === 0 ? (
            exercises.length === 0 ? (
               <p>{t('workouts.noExercises')}</p>
            ) : (
               <p>{t('workouts.noWorkouts')}</p>
            )
         ) : (
            workouts.map((training, index) => (
               <BlockWorkout
                  key={index}
                  workout={training}
                  clicker={clicker}
                  controlOrder={controlOrder}
                  index={index}
                  {...(controlOrder ? { filteredLength: workouts.length } : {})}
               />
            ))
         )}
      </div>
   )
}

export default ListOfWorkouts
