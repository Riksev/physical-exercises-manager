import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Workouts from './components/Workouts'
import Exercises from './components/Exercises'
import {
   Pages,
   type IExercise,
   type IWorkout,
   type PageNames,
} from './interfaces'
import Statistics from './components/Statistics'

function App() {
   const [exercises, setExercises] = useState<IExercise[]>([])
   const [workouts, setWorkouts] = useState<IWorkout[]>([])

   const [activePage, setActivePage] = useState<PageNames>('workouts')
   const [activeExercise, setActiveExercise] = useState<IExercise | null>(null)
   const [activeWorkout, setActiveWorkout] = useState<IWorkout | null>(null)

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
            workouts.find((w) => w.date === activeWorkout.date) || null
         )
      }
   }, [activeWorkout, workouts])

   return (
      <div className="flex min-h-screen w-full flex-col items-center">
         <div className="flex h-screen min-h-screen w-full flex-col items-center gap-4 overflow-y-scroll bg-gradient-to-br from-fuchsia-200 to-cyan-200 p-4 pb-20 text-center md:w-3/4 lg:w-1/2">
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
                  workouts={workouts}
                  activeWorkout={activeWorkout}
                  setActiveWorkout={setActiveWorkout}
               />
            )}
            {activePage === Pages.STATISTICS && <Statistics />}
            <Menu
               activePage={activePage}
               setActivePage={setActivePage}
               setActiveExercise={setActiveExercise}
               setActiveWorkout={setActiveWorkout}
            />
         </div>
      </div>
   )
}

export default App
