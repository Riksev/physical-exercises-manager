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

   const setData = (newExercises: IExercise[], newWorkouts: IWorkout[]) => {
      setExercises(newExercises)
      setWorkouts(newWorkouts)
      setDateBegin(getDate())
      setDateEnd(
         newWorkouts.length > 0
            ? getDate(new Date(newWorkouts[0].date))
            : getDate()
      )
      setSelectedExercise(null)
   }

   useEffect((): void => {
      const storedExercises = localStorage.getItem('exercises')
      if (storedExercises) {
         setExercises(JSON.parse(storedExercises) as IExercise[])
      }
      const storedWorkouts = localStorage.getItem('workouts')
      if (storedWorkouts) {
         const parsedWorkouts = JSON.parse(storedWorkouts) as IWorkout[]
         setWorkouts(parsedWorkouts)
         setDateBegin(
            parsedWorkouts.length > 0
               ? getDate(
                    new Date(parsedWorkouts[parsedWorkouts.length - 1].date)
                 )
               : getDate()
         )
         setDateEnd(
            parsedWorkouts.length > 0
               ? getDate(new Date(parsedWorkouts[0].date))
               : getDate()
         )
      } else {
         setDateBegin(getDate())
         setDateEnd(getDate())
      }
   }, [])

   useEffect((): void => {
      localStorage.setItem('exercises', JSON.stringify(exercises))
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

   useEffect((): void => {
      localStorage.setItem('workouts', JSON.stringify(workouts))
      setFilteredWorkouts(workouts.slice().reverse())
      setIsFiltered(false)
      setDateBegin(
         workouts.length > 0
            ? getDate(new Date(workouts[workouts.length - 1].date))
            : getDate()
      )
      setDateEnd(
         workouts.length > 0 ? getDate(new Date(workouts[0].date)) : getDate()
      )
      if (activeWorkout) {
         setActiveWorkout(
            workouts.find((w) => w._id === activeWorkout._id) || null
         )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [workouts])

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
