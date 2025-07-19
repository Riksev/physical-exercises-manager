import { useEffect, useRef, useState } from 'react'
import Menu from './components/Menu'
import Workouts from './components/workouts/Workouts'
import Exercises from './components/exercises/Exercises'
import {
   Pages,
   type IExercise,
   type IWorkout,
   type PageNames,
} from './interfaces'
import Other from './components/other/Other'

function App() {
   const [exercises, setExercises] = useState<IExercise[]>([])
   const [workouts, setWorkouts] = useState<IWorkout[]>([])

   const [activePage, setActivePage] = useState<PageNames>('workouts')
   const [activeExercise, setActiveExercise] = useState<IExercise | null>(null)
   const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null)

   const scrollRef = useRef<HTMLDivElement>(null)

   const getFirstDayOfMonth = (): string => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = '01'
      return `${year}-${month}-${day}`
   }

   const getCurrentDate = (): string => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   }
   const [dateBegin, setDateBegin] = useState<string>(getFirstDayOfMonth())
   const [dateEnd, setDateEnd] = useState<string>(getCurrentDate())
   const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
      null
   )
   const [filteredWorkouts, setFilteredWorkouts] = useState(
      workouts.slice().reverse()
   )
   const [isFiltered, setIsFiltered] = useState<boolean>(false)

   const setData = (exercises: IExercise[]) => {
      setExercises(exercises)
   }

   useEffect((): void => {
      const storedExercises = localStorage.getItem('exercises')
      if (storedExercises) {
         setExercises(JSON.parse(storedExercises) as IExercise[])
      }
      const storedWorkouts = localStorage.getItem('workouts')
      if (storedWorkouts) {
         setWorkouts(JSON.parse(storedWorkouts) as IWorkout[])
      }
   }, [])

   useEffect((): void => {
      localStorage.setItem('exercises', JSON.stringify(exercises))
   }, [exercises])

   useEffect((): void => {
      localStorage.setItem('workouts', JSON.stringify(workouts))
      setFilteredWorkouts(workouts.slice().reverse())
      setIsFiltered(false)
   }, [workouts])

   useEffect((): void => {
      if (activeExercise) {
         setActiveExercise(
            exercises.find((ex) => ex._id === activeExercise._id) || null
         )
      }
   }, [activeExercise, exercises])

   useEffect((): void => {
      if (activeWorkout) {
         setActiveWorkout(
            workouts.find((w) => w._id === activeWorkout._id) || null
         )
      }
   }, [activeWorkout, workouts])

   return (
      <div className="app-bg">
         <div className="app-main" ref={scrollRef}>
            {activePage === Pages.EXERCISES && (
               <Exercises
                  exercises={exercises}
                  setExercises={setExercises}
                  activeExercise={activeExercise}
                  setActiveExercise={setActiveExercise}
                  setWorkouts={setWorkouts}
               />
            )}
            {activePage === Pages.WORKOUTS && (
               <Workouts
                  exercises={exercises}
                  setWorkouts={setWorkouts}
                  filteredWorkouts={filteredWorkouts}
                  setFilteredWorkouts={setFilteredWorkouts}
                  dateBegin={dateBegin}
                  setDateBegin={setDateBegin}
                  dateEnd={dateEnd}
                  setDateEnd={setDateEnd}
                  isFiltered={isFiltered}
                  setIsFiltered={setIsFiltered}
                  selectedExercise={selectedExercise}
                  setSelectedExercise={setSelectedExercise}
                  workouts={workouts}
                  activeWorkout={activeWorkout}
                  setActiveWorkout={setActiveWorkout}
                  scrollRef={scrollRef}
               />
            )}
            {activePage === Pages.STATISTICS && (
               <Other
                  exercises={exercises}
                  workouts={workouts}
                  setData={setData}
               />
            )}
            <Menu
               activePage={activePage}
               setActivePage={setActivePage}
               setActiveExercise={setActiveExercise}
               setActiveWorkout={setActiveWorkout}
               scrollRef={scrollRef}
            />
         </div>
      </div>
   )
}

export default App
