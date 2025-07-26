import { useState, type Dispatch, type SetStateAction } from 'react'
import type { IExercise, IModal, IWorkout } from '../../interfaces'
import ListOfWorkouts from './ListOfWorkouts'
import {
   DateCalendar,
   LocalizationProvider,
   PickersDay,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Badge from '@mui/material/Badge'
import Workout from './Workout'
import SelectExerciseModal from '../modals/other/SelectExerciseModal'
import { useAppSelector } from '../../app/hooks'
import Box from '@mui/material/Box'
import dayjs, { Dayjs } from 'dayjs'

interface IWorkoutsProps {
   filteredWorkouts: IWorkout[]
   date: dayjs.Dayjs | null | undefined
   setDate: Dispatch<SetStateAction<dayjs.Dayjs | null | undefined>>
   selectedExercise: IExercise | null
   setSelectedExercise: Dispatch<SetStateAction<IExercise | null>>
   activeWorkout: IWorkout | null
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   setModal: Dispatch<SetStateAction<IModal | null>>
   modal: IModal | null
}

const Workouts = ({
   filteredWorkouts,
   date,
   setDate,
   setSelectedExercise,
   activeWorkout,
   setActiveWorkout,
   setModal,
   modal,
}: IWorkoutsProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)

   const [isSelectExerciseModalOpen, setIsSelectExerciseModalOpen] =
      useState<boolean>(false)

   const exerciseInteraction = (exercise: IExercise) => {
      setSelectedExercise(exercise)
      setIsSelectExerciseModalOpen(false)
   }

   const getWorkoutsOnDate = (dateJS: Dayjs): IWorkout[] => {
      const dateRaw = dateJS.format('YYYY-MM-DD')
      const workoutsOnDate: Array<IWorkout> = workouts.filter(
         (workout) => workout.date === dateRaw
      )
      return workoutsOnDate
   }

   interface CustomDayProps {
      foundWorkouts: IWorkout[]
   }

   const CustomDay = (
      props: CustomDayProps & React.ComponentProps<typeof PickersDay>
   ) => {
      const { foundWorkouts, ...other } = props

      const getWorkoutColor = (w: IWorkout) => {
         if (other.selected) {
            return ''
         }
         switch (w.difficulty) {
            case 'easy':
               return 'easy-workout'
            case 'medium':
               return 'medium-workout'
            case 'hard':
               return 'hard-workout'
            default:
               return 'medium-workout'
         }
      }

      return (
         <Badge
            badgeContent={
               foundWorkouts.length > 1 ? foundWorkouts.length : undefined
            }
            overlap="circular"
         >
            <PickersDay
               {...other}
               className={
                  foundWorkouts.length > 1
                     ? other.selected
                        ? ''
                        : 'multiple-workouts'
                     : foundWorkouts.length === 1
                       ? getWorkoutColor(foundWorkouts[0])
                       : ''
               }
            />
         </Badge>
      )
   }

   return !activeWorkout ? (
      <div className="app-page">
         <h2 className="horizontal-line title">Мої тренування</h2>
         {/* <details className="details">
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
               <div className="input-block-row">
                  <label htmlFor="exercise">Вправа:</label>
                  <div className="relative flex w-full items-center justify-end">
                     <input
                        readOnly
                        type="text"
                        id="exercise"
                        className="w-9/10 pr-8 sm:w-4/7"
                        value={selectedExercise?.name || 'Всі вправи'}
                        onClick={() => setIsSelectExerciseModalOpen(true)}
                     />
                     <span className="pointer-events-none absolute right-3 text-gray-500 hover:text-gray-700">
                        <svg
                           className="h-5 w-5"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                           />
                        </svg>
                     </span>
                  </div>
               </div>
               <button
                  className="button-action button-modal mb-2"
                  onClick={() => {
                     setFilteredWorkouts(() => {
                        const updatedWorkouts = [...workouts]
                        const exerciseInfo: IExercise | null = selectedExercise
                           ? exercises.find(
                                (exercise) =>
                                   exercise.name === selectedExercise.name
                             ) || null
                           : null
                        const fromDate =
                           dateBegin < dateEnd ? dateBegin : dateEnd
                        const toDate = dateBegin < dateEnd ? dateEnd : dateBegin
                        const newWorkouts = updatedWorkouts.flatMap(
                           (workout) => {
                              if (
                                 workout.date < fromDate ||
                                 workout.date > toDate
                              ) {
                                 return []
                              }
                              if (!exerciseInfo) {
                                 return [workout]
                              }
                              const exerciseIndex = workout.exercises.findIndex(
                                 (ex) => ex.exercise_id === exerciseInfo._id
                              )
                              if (exerciseIndex === -1) {
                                 return []
                              }
                              return [
                                 {
                                    ...workout,
                                    exercises: [
                                       workout.exercises[exerciseIndex],
                                    ],
                                 },
                              ]
                           }
                        )
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
                     setFilteredWorkouts(workouts.slice().reverse())
                     setIsFiltered(false)
                  }}
               >
                  скинути
               </button>
            </div>
         </details> */}
         <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <Box>
                  <DateCalendar
                     value={date}
                     onChange={(newDate) => setDate(newDate)}
                     slots={{
                        day: (dayProps) => (
                           <CustomDay
                              {...dayProps}
                              foundWorkouts={getWorkoutsOnDate(dayProps.day)}
                           />
                        ),
                     }}
                  />
               </Box>
            </LocalizationProvider>
         </div>
         <h2 className="horizontal-line my-1"></h2>
         <button
            className="button-add button-full"
            onClick={() => {
               setModal({
                  action: 'add',
                  item: 'workout',
                  data: {
                     date: date?.toDate(),
                  },
               })
            }}
         >
            додати
         </button>
         <ListOfWorkouts
            workouts={filteredWorkouts}
            clicker={setActiveWorkout}
         />
         {isSelectExerciseModalOpen && (
            <SelectExerciseModal
               setIsModalOpen={setIsSelectExerciseModalOpen}
               clicker={exerciseInteraction}
            />
         )}
      </div>
   ) : (
      <Workout
         activeWorkout={activeWorkout}
         setActiveWorkout={setActiveWorkout}
         setModal={setModal}
         modal={modal}
      />
   )
}

export default Workouts
