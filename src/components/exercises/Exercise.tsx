import { useState, type Dispatch, type SetStateAction } from 'react'
import type { IExercise, IModal, IWorkout } from '../../interfaces'
import ExerciseHistory from './ExerciseHistory'
import { Swiper as SwiperType } from 'swiper'
import { useTranslation } from 'react-i18next'

interface IExerciseProps {
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
   setModal: Dispatch<SetStateAction<IModal | null>>
   swiperRef: React.RefObject<SwiperType | null>
   setActivePage: Dispatch<SetStateAction<number>>
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
}

const Exercise = ({
   activeExercise,
   setActiveExercise,
   setModal,
   swiperRef,
   setActivePage,
   setActiveWorkout,
}: IExerciseProps) => {
   const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false)
   const { t } = useTranslation()

   return !isHistoryOpen ? (
      <div className="app-page">
         <h2 className="horizontal-line title">{activeExercise?.name}</h2>
         <div className="flex w-full flex-col items-center gap-4">
            <button
               className="button-action button-full"
               onClick={() => {
                  setIsHistoryOpen(true)
               }}
            >
               {t('exercises.exercise.records')}
            </button>
            <button className="button-action button-full" disabled>
               {t('exercises.exercise.statistics')}
            </button>
            <a
               className="button-full flex items-center justify-center rounded-2xl bg-white font-bold transition-all delay-200 hover:bg-gray-300 active:bg-gray-300"
               href={`https://www.google.com/search?q=${activeExercise.name.split(' ').join('+')}`}
               target="_blank"
               rel="noopener noreferrer"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="mr-5 inline-block h-6 w-6"
               >
                  <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
               </svg>
               Google
            </a>
            <a
               className="button-full flex items-center justify-center rounded-2xl bg-white font-bold transition-all delay-200 hover:bg-gray-300 active:bg-gray-300"
               href={`https://www.youtube.com/results?search_query=${activeExercise.name.split(' ').join('+')}`}
               target="_blank"
               rel="noopener noreferrer"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="mr-2 inline-block h-6 w-6 fill-red-500"
               >
                  <path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z" />
               </svg>
               Youtube
            </a>
            <button
               className="button-action button-full"
               onClick={() => {
                  setModal({
                     action: 'notes',
                     item: 'exercise',
                     data: { activeExercise },
                  })
               }}
            >
               {t('exercises.exercise.notes')}
            </button>
            <button
               className="button-edit button-full"
               onClick={() => {
                  setModal({
                     action: 'edit',
                     item: 'exercise',
                     data: { activeExercise },
                  })
               }}
            >
               {t('exercises.exercise.edit')}
            </button>
            <button
               className="button-delete button-full"
               onClick={() => {
                  setModal({
                     action: 'delete',
                     item: 'exercise',
                     data: { activeExercise },
                  })
               }}
            >
               {t('exercises.exercise.delete')}
            </button>
            <button
               className="button-action button-full"
               onClick={() => {
                  setActiveExercise(null)
               }}
            >
               {t('exercises.exercise.back')}
            </button>
         </div>
      </div>
   ) : (
      <ExerciseHistory
         activeExercise={activeExercise}
         setIsHistoryOpen={setIsHistoryOpen}
         swiperRef={swiperRef}
         setActivePage={setActivePage}
         setActiveWorkout={setActiveWorkout}
      />
   )
}

export default Exercise
