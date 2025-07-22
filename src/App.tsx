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
import { useAppSelector } from './app/hooks'

function App() {
   // General data
   const exercises = useAppSelector((state) => state.data.exercises)
   const workouts = useAppSelector((state) => state.data.workouts)

   const [activePage, setActivePage] = useState<PageNames>('workouts')
   const [activeExercise, setActiveExercise] = useState<IExercise | null>(null)
   const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null)

   const scrollRef = useRef<HTMLDivElement>(null)

   const getDate = (now: Date = new Date()): string => {
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
   }
   const [dateBegin, setDateBegin] = useState<string>('')
   const [dateEnd, setDateEnd] = useState<string>('')
   const [selectedExercise, setSelectedExercise] = useState<IExercise | null>(
      null
   )
   const [filteredWorkouts, setFilteredWorkouts] = useState(
      workouts.slice().reverse()
   )
   const [isFiltered, setIsFiltered] = useState<boolean>(false)

   useEffect((): void => {
      if (workouts.length > 0) {
         setDateBegin(getDate(new Date(workouts[workouts.length - 1].date)))
         setDateEnd(getDate(new Date(workouts[0].date)))
      } else {
         setDateBegin(getDate())
         setDateEnd(getDate())
      }
      setFilteredWorkouts(workouts.slice().reverse())
      setIsFiltered(false)
      if (activeWorkout) {
         setActiveWorkout(
            workouts.find((w) => w._id === activeWorkout._id) || null
         )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [workouts])

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

   return (
      <div className="app-bg">
         <div className="app-main" ref={scrollRef}>
            {activePage === Pages.EXERCISES && (
               <Exercises
                  exercises={exercises}
                  activeExercise={activeExercise}
                  setActiveExercise={setActiveExercise}
               />
            )}
            {activePage === Pages.WORKOUTS && (
               <Workouts
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
                  activeWorkout={activeWorkout}
                  setActiveWorkout={setActiveWorkout}
                  scrollRef={scrollRef}
               />
            )}
            {activePage === Pages.STATISTICS && <Other />}
         </div>
         <Menu
            activePage={activePage}
            setActivePage={setActivePage}
            setActiveExercise={setActiveExercise}
            setActiveWorkout={setActiveWorkout}
            scrollRef={scrollRef}
         />
      </div>
   )
}

export default App
