import { useMemo, type Dispatch, type SetStateAction } from 'react'
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
import { useAppSelector } from '../../app/hooks'
import Box from '@mui/material/Box'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/uk'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'
import { enUS, ukUA, ruRU } from '@mui/x-date-pickers/locales'
import { Swiper as SwiperType } from 'swiper'

interface IWorkoutsProps {
   filteredWorkouts: IWorkout[]
   date: dayjs.Dayjs | null | undefined
   setDate: Dispatch<SetStateAction<dayjs.Dayjs | null | undefined>>
   activeWorkout: IWorkout | null
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   setModal: Dispatch<SetStateAction<IModal | null>>
   modal: IModal | null
   swiperRef: React.RefObject<SwiperType | null>
   setActivePage: Dispatch<SetStateAction<number>>
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
}

const Workouts = ({
   filteredWorkouts,
   date,
   setDate,
   activeWorkout,
   setActiveWorkout,
   setModal,
   modal,
   swiperRef,
   setActivePage,
   setActiveExercise,
}: IWorkoutsProps) => {
   const workouts = useAppSelector((state) => state.data.workouts)
   interface DetectedLocale {
      dayjsLocale: string
      muiLocaleText: object
   }

   const getBrowserLocaleInfo = (): DetectedLocale => {
      const browserLang = navigator.language

      if (browserLang.includes('uk')) {
         return {
            dayjsLocale: 'uk',
            muiLocaleText:
               ukUA.components.MuiLocalizationProvider.defaultProps.localeText,
         }
      }
      if (browserLang.includes('ru')) {
         return {
            dayjsLocale: 'ru',
            muiLocaleText:
               ruRU.components.MuiLocalizationProvider.defaultProps.localeText,
         }
      }

      return {
         dayjsLocale: 'en',
         muiLocaleText:
            enUS.components.MuiLocalizationProvider.defaultProps.localeText,
      }
   }

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const localeInfo = useMemo(() => getBrowserLocaleInfo(), [])

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
         <div className="w-full">
            <LocalizationProvider
               dateAdapter={AdapterDayjs}
               adapterLocale={localeInfo.dayjsLocale}
               localeText={localeInfo.muiLocaleText}
            >
               <Box>
                  <DateCalendar
                     value={date}
                     onChange={(newDate) => setDate(newDate)}
                     dayOfWeekFormatter={(day) => {
                        return day
                           .toDate()
                           .toLocaleDateString(localeInfo.dayjsLocale, {
                              weekday: 'short',
                           })
                           .slice(0, 2)
                     }}
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
            controlOrder={true}
         />
      </div>
   ) : (
      <Workout
         activeWorkout={activeWorkout}
         setActiveWorkout={setActiveWorkout}
         setModal={setModal}
         modal={modal}
         swiperRef={swiperRef}
         setActivePage={setActivePage}
         setActiveExercise={setActiveExercise}
      />
   )
}

export default Workouts
