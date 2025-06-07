import { useEffect, useState } from 'react'
import Menu from './components/Menu'
import Workouts from './components/Workouts'
import Exercises from './components/Exercises'
import type { IExercise, IWorkout } from './interfaces'
import Statistics from './components/Statistics'
import pages from './utilities'

function App() {
   const [exercises, setExercises] = useState<IExercise[]>([])
   const [workouts, setWorkouts] = useState<IWorkout[]>([])

   const [activePage, setActivePage] = useState<string>(pages.EXERCISES)
   const [activeExercise, setActiveExercise] = useState<IExercise>({
      _id: 'none',
      name: 'none',
      hasReps: false,
      hasWeight: false,
      hasTime: false,
   })

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

   return (
      <div className="flex min-h-screen w-full flex-col items-center">
         <div className="flex h-screen min-h-screen w-full flex-col items-center gap-4 overflow-y-scroll bg-gradient-to-br from-fuchsia-200 to-cyan-200 p-4 pb-20 text-center md:w-3/4 lg:w-1/2">
            {activePage === pages.EXERCISES && (
               <Exercises
                  exercises={exercises}
                  setExercises={setExercises}
                  activeExercise={activeExercise}
                  setActiveExercise={setActiveExercise}
                  setActivePage={setActivePage}
                  setWorkouts={setWorkouts}
               />
            )}
            {activePage === pages.WORKOUTS && (
               <Workouts
                  exercises={exercises}
                  activeExercise={activeExercise}
                  setWorkouts={setWorkouts}
                  workouts={workouts}
               />
            )}
            {activePage === pages.STATISTICS && <Statistics />}
            <Menu
               activePage={activePage}
               setActivePage={setActivePage}
               setActiveExercise={setActiveExercise}
            />
         </div>
      </div>
   )
}

export default App
