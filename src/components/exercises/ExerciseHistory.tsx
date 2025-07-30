import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Pages, type IExercise, type IWorkout } from '../../interfaces'
import { useAppSelector } from '../../app/hooks'
import ListOfWorkouts from '../workouts/ListOfWorkouts'
import { Swiper as SwiperType } from 'swiper'

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

   const [dateBegin, setDateBegin] = useState<string>('')
   const [dateEnd, setDateEnd] = useState<string>('')
   const [errorDateBegin, setErrorDateBegin] = useState<string>('')
   const [errorDateEnd, setErrorDateEnd] = useState<string>('')
   const [isFiltered, setIsFiltered] = useState<boolean>(false)

   const [records, setRecords] = useState<IWorkout[]>([])

   const handleClick = (workout: IWorkout) => {
      setActiveWorkout(workout)
      setActivePage(Pages.WORKOUTS)
      swiperRef.current?.slideTo(Pages.WORKOUTS)
   }

   useEffect(() => {
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
      setDateBegin(workouts[workouts.length - 1]?.date || '')
      setDateEnd(workouts[0]?.date || '')
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [workouts])

   useEffect(() => {
      if (!dateBegin.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDateBegin('Невірний формат дати (YYYY-MM-DD).')
      } else {
         setErrorDateBegin('')
      }
   }, [dateBegin])

   useEffect(() => {
      if (!dateEnd.match(/^\d{4}-\d{2}-\d{2}$/)) {
         setErrorDateEnd('Невірний формат дати (YYYY-MM-DD).')
      } else {
         setErrorDateEnd('')
      }
   }, [dateEnd])

   return (
      <div className="app-page">
         <h2 className="horizontal-line title">{activeExercise?.name}</h2>
         <details className="details">
            <summary>
               Фільтри{' '}
               <span className="text-red-500">{isFiltered ? '✅' : '❌'}</span>
            </summary>
            <div className="flex w-full flex-col items-center justify-between gap-2">
               <div className="input-block-row">
                  <label htmlFor="dateBegin">Від:</label>
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
                  <label htmlFor="dateEnd">До:</label>
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
                  застосувати
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
                     setDateBegin(workouts[workouts.length - 1]?.date || '')
                     setDateEnd(workouts[0]?.date || '')
                     setIsFiltered(false)
                  }}
               >
                  скинути
               </button>
            </div>
         </details>
         <button
            className="button-action button-full"
            onClick={() => {
               setIsHistoryOpen(false)
            }}
         >
            назад
         </button>
         {records.length === 0 ? (
            <p>Записи відсутні.</p>
         ) : (
            <ListOfWorkouts workouts={records} clicker={handleClick} />
         )}
      </div>
   )
}

export default ExerciseHistory
