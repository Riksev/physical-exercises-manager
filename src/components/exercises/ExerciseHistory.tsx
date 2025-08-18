import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Pages, type IExercise, type IWorkout } from '../../interfaces'
import { useAppSelector } from '../../app/hooks'
import ListOfWorkouts from '../workouts/ListOfWorkouts'
import { Swiper as SwiperType } from 'swiper'
import { useTranslation } from 'react-i18next'

interface IExerciseHistoryProps {
   activeExercise: IExercise | null
   setIsHistoryOpen: Dispatch<SetStateAction<boolean>>
   swiperRef: React.RefObject<SwiperType | null>
   setActivePage: Dispatch<SetStateAction<number>>
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
}

const ExerciseHistory = ({
   activeExercise,
   setIsHistoryOpen,
   swiperRef,
   setActivePage,
   setActiveWorkout,
}: IExerciseHistoryProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   const { t } = useTranslation()

   const [dateBegin, setDateBegin] = useState<string>('')
   const [dateEnd, setDateEnd] = useState<string>('')
   const [errorDateBegin, setErrorDateBegin] = useState<string>('')
   const [errorDateEnd, setErrorDateEnd] = useState<string>('')
   const [isFiltered, setIsFiltered] = useState<boolean>(false)

   const [records, setRecords] = useState<IWorkout[]>([])

   const handleClick = (workout: IWorkout) => {
      setActiveWorkout(workouts.find((w) => w._id === workout._id) ?? null)
      setActivePage(Pages.WORKOUTS)
      swiperRef.current?.slideTo(Pages.WORKOUTS)
   }

   useEffect(() => {
      setRecords(() => {
         const newRecords = workouts
            .map((workout) => ({
               ...workout,
               exercises: workout.exercises.filter(
                  (ex) =>
                     ex.exercise_id === activeExercise?._id ||
                     ex._id === activeExercise?._id
               ),
            }))
            .filter((workout) => workout.exercises.length > 0)
            .reverse()
         if (newRecords.length > 0) {
            setDateBegin(newRecords[0].date || '')
            setDateEnd(newRecords[newRecords.length - 1].date || '')
         } else {
            setDateBegin(new Date().toISOString().split('T')[0])
            setDateEnd(new Date().toISOString().split('T')[0])
         }
         return newRecords
      })
   }, [workouts, activeExercise])

   useEffect(() => {
      if (!dateBegin.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDateBegin(t('exercises.exercise.history.wrongDateFormat'))
      } else {
         setErrorDateBegin('')
      }
   }, [dateBegin, t])

   useEffect(() => {
      if (!dateEnd.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDateEnd(t('exercises.exercise.history.wrongDateFormat'))
      } else {
         setErrorDateEnd('')
      }
   }, [dateEnd, t])

   return (
      <div className="app-page">
         <h2 className="horizontal-line title">{activeExercise?.name}</h2>
         <details className="details">
            <summary>
               {t('exercises.exercise.history.filters')}{' '}
               <span className="text-red-500">{isFiltered ? '✅' : '❌'}</span>
            </summary>
            <div className="flex w-full flex-col items-center justify-between gap-2">
               <div className="input-block-row">
                  <label htmlFor="dateBegin">
                     {t('exercises.exercise.history.from')}
                  </label>
                  <input
                     type="date"
                     id="dateBegin"
                     className="w-2/3 sm:w-1/2"
                     value={dateBegin}
                     onChange={(e) => {
                        setDateBegin(e.target.value)
                     }}
                  />
               </div>
               {errorDateBegin && (
                  <p className="error-message">{errorDateBegin}</p>
               )}
               <div className="input-block-row">
                  <label htmlFor="dateEnd">
                     {t('exercises.exercise.history.to')}
                  </label>
                  <input
                     type="date"
                     id="dateEnd"
                     className="w-2/3 sm:w-1/2"
                     value={dateEnd}
                     onChange={(e) => {
                        setDateEnd(e.target.value)
                     }}
                  />
               </div>
               {errorDateEnd && <p className="error-message">{errorDateEnd}</p>}
               <button
                  className="button-action button-modal mb-2"
                  onClick={() => {
                     setRecords(() => {
                        const updatedWorkouts = [...workouts]
                        const fromDate =
                           dateBegin < dateEnd ? dateBegin : dateEnd
                        const toDate = dateBegin < dateEnd ? dateEnd : dateBegin
                        const newWorkouts = updatedWorkouts
                           .flatMap((workout) => {
                              if (
                                 workout.date < fromDate ||
                                 workout.date > toDate
                              ) {
                                 return []
                              }
                              const newExercises = workout.exercises.filter(
                                 (ex) => ex.exercise_id === activeExercise?._id
                              )
                              if (newExercises.length === 0) {
                                 return []
                              }

                              return [
                                 {
                                    ...workout,
                                    exercises: newExercises,
                                 },
                              ]
                           })
                           .filter((workout) => workout.exercises.length > 0)
                        return dateBegin > dateEnd
                           ? newWorkouts.reverse()
                           : newWorkouts
                     })
                     setIsFiltered(true)
                  }}
                  disabled={errorDateBegin !== '' || errorDateEnd !== ''}
               >
                  {t('exercises.exercise.history.apply')}
               </button>
               <button
                  className="button-action button-modal"
                  onClick={() => {
                     setRecords(
                        workouts
                           .map((workout) => ({
                              ...workout,
                              exercises: workout.exercises.filter(
                                 (ex) => ex.exercise_id === activeExercise?._id
                              ),
                           }))
                           .filter((workout) => workout.exercises.length > 0)
                           .reverse()
                     )
                     setDateBegin(
                        [...workouts]
                           .reverse()
                           .find((w) =>
                              w.exercises.some(
                                 (ex) => ex.exercise_id === activeExercise?._id
                              )
                           )?.date || ''
                     )
                     setDateEnd(
                        workouts.find((w) =>
                           w.exercises.some(
                              (ex) => ex.exercise_id === activeExercise?._id
                           )
                        )?.date || ''
                     )
                     setIsFiltered(false)
                  }}
               >
                  {t('exercises.exercise.history.reset')}
               </button>
            </div>
         </details>
         <button
            className="button-action button-full"
            onClick={() => {
               setIsHistoryOpen(false)
            }}
         >
            {t('exercises.exercise.history.back')}
         </button>
         {records.length === 0 ? (
            <p>{t('exercises.exercise.history.noRecords')}</p>
         ) : (
            <ListOfWorkouts workouts={records} clicker={handleClick} />
         )}
      </div>
   )
}

export default ExerciseHistory
