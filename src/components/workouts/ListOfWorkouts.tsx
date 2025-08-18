import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../app/hooks'
import type { IExercise, IWorkout } from '../../interfaces'
import BlockWorkout from './BlockWorkout'
import { Swiper as SwiperType } from 'swiper'
import type { Dispatch, SetStateAction } from 'react'

interface IListOfWorkoutsProps {
   workouts: IWorkout[]
   clicker: (workout: IWorkout) => void
   controlOrder?: boolean
   swiperRef: React.RefObject<SwiperType | null>
   setActivePage: Dispatch<SetStateAction<number>>
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
}

const ListOfWorkouts = ({
   workouts,
   clicker,
   controlOrder,
   swiperRef,
   setActivePage,
   setActiveExercise,
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
                  swiperRef={swiperRef}
                  setActivePage={setActivePage}
                  setActiveExercise={setActiveExercise}
                  {...(controlOrder ? { filteredLength: workouts.length } : {})}
               />
            ))
         )}
      </div>
   )
}

export default ListOfWorkouts
