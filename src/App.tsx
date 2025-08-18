import { useEffect, useRef, useState } from 'react'
import Menu from './components/Menu'
import Workouts from './components/workouts/Workouts'
import Exercises from './components/exercises/Exercises'
import { Pages, type IExercise, type IModal, type IWorkout } from './interfaces'
import Other from './components/other/Other'
import { useAppSelector } from './app/hooks'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import Modal from './components/modals/Modal'
import dayjs from 'dayjs'
import IconImage from './assets/icon.svg'
import { useTranslation } from 'react-i18next'

function App() {
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)
   const settings = useAppSelector((state) => state.settings.settings)

   const { i18n } = useTranslation()

   const swiperRef = useRef<SwiperType | null>(null)

   const [modal, setModal] = useState<IModal | null>(null)

   const [activePage, setActivePage] = useState<number>(
      swiperRef.current?.activeIndex || Pages.WORKOUTS
   )
   const [activeExercise, setActiveExercise] = useState<IExercise | null>(null)
   const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null)
   const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
      null
   )
   const [date, setDate] = useState<dayjs.Dayjs | null | undefined>(dayjs())
   const [filteredWorkouts, setFilteredWorkouts] = useState(workouts.slice())

   useEffect((): void => {
      setFilteredWorkouts(
         workouts
            .filter((workout) => {
               if (!date) return true
               return workout.date === date.format('YYYY-MM-DD')
            })
            .slice()
      )
      if (activeWorkout) {
         setActiveWorkout(
            workouts.find((w) => w._id === activeWorkout._id) || null
         )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [workouts, date])

   useEffect((): void => {
      if (selectedExercise) {
         setSelectedExercise(
            exercises.find((ex) => ex._id === selectedExercise._id) || null
         )
      }
      if (activeExercise) {
         setActiveExercise(
            exercises.find((ex) => ex._id === activeExercise._id) || null
         )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [exercises])

   useEffect(() => {
      i18n.changeLanguage(settings.language)
   }, [i18n, settings.language])

   return (
      <div className="app-bg relative pt-6">
         <div className="absolute top-0 z-10000 flex w-full flex-row items-center justify-center gap-2 rounded-b-2xl bg-gradient-to-br from-fuchsia-900 to-blue-600 py-2 shadow-xl select-none">
            <img
               src={IconImage}
               alt="gymanote icon"
               className="inline-block h-8 w-8 align-middle"
               draggable="false"
            />
            <p className="inline-block w-fit text-center text-2xl font-bold text-white uppercase">
               gymanote
            </p>
         </div>

         <Swiper
            className="my-swiper"
            grabCursor={true}
            spaceBetween={0}
            initialSlide={1}
            onSwiper={(swiper) => {
               swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
               setActivePage(swiper.activeIndex)
            }}
         >
            <SwiperSlide>
               <Exercises
                  exercises={exercises}
                  activeExercise={activeExercise}
                  setActiveExercise={setActiveExercise}
                  setModal={setModal}
                  swiperRef={swiperRef}
                  setActivePage={setActivePage}
                  setActiveWorkout={setActiveWorkout}
               />
            </SwiperSlide>
            <SwiperSlide>
               <Workouts
                  filteredWorkouts={filteredWorkouts}
                  date={date}
                  setDate={setDate}
                  activeWorkout={activeWorkout}
                  setActiveWorkout={setActiveWorkout}
                  setModal={setModal}
                  modal={modal}
                  swiperRef={swiperRef}
                  setActivePage={setActivePage}
                  setActiveExercise={setActiveExercise}
               />
            </SwiperSlide>
            <SwiperSlide>
               <Other setModal={setModal} />
            </SwiperSlide>
         </Swiper>
         <Menu
            activePage={activePage}
            setActivePage={setActivePage}
            setActiveExercise={setActiveExercise}
            setActiveWorkout={setActiveWorkout}
            swiperRef={swiperRef}
         />
         {modal && <Modal info={modal} setModal={setModal} />}
      </div>
   )
}

export default App
