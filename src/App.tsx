import { useEffect, useRef, useState } from 'react'
import Menu from './components/Menu'
import Workouts from './components/Workouts'
import Exercises from './components/Exercises'
import {
   Pages,
   type IExercise,
   type IRecord,
   type IWorkout,
   type PageNames,
} from './interfaces'
import Other from './components/Other'

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

   const setWorkoutsCompatible = (arr: IWorkout[]) => {
      setWorkouts(() => {
         return arr.map((workout, index) => {
            if (!workout.exercises) {
               workout.exercises = []
            } else {
               workout.exercises = workout.exercises.map((ex) => {
                  ex.records = ex.records.map((rec, indexInner) => {
                     if (!rec._id) {
                        return {
                           ...rec,
                           _id: (new Date().getTime() + indexInner).toString(),
                        }
                     }
                     return rec
                  })
                  return ex
               })
            }
            if (workout.workouts) {
               workout.workouts.forEach((w) => {
                  const newRecord: IRecord = {
                     _id: (new Date().getTime() + index).toString(),
                     ...(w.reps && { reps: w.reps }),
                     ...(w.weight && { weight: w.weight }),
                     ...(w.time && { time: w.time }),
                  }

                  if (
                     exercises.findIndex((ex) => ex._id === w.exercise_id) !==
                     -1
                  ) {
                     const exerciseId = workout.exercises.findIndex(
                        (ex) => ex.exercise_id === w.exercise_id
                     )

                     if (exerciseId === -1) {
                        workout.exercises.push({
                           exercise_id: w.exercise_id,
                           records: [newRecord],
                        })
                     } else {
                        workout.exercises[exerciseId].records.push(newRecord)
                     }
                  }
               })
            }
            if (workout._id) {
               return workout
            }
            return {
               _id: (new Date().getTime() + index).toString(),
               date: workout.date,
               exercises: workout.exercises,
            }
         })
      })
   }

   const setData = (exercises: IExercise[], workouts: IWorkout[]) => {
      setExercises(exercises)
      setWorkoutsCompatible(workouts)
   }

   useEffect((): void => {
      const storedExercises = localStorage.getItem('exercises')
      if (storedExercises) {
         setExercises(JSON.parse(storedExercises) as IExercise[])
      }
      const storedWorkouts = localStorage.getItem('workouts')
      if (storedWorkouts) {
         setWorkoutsCompatible(JSON.parse(storedWorkouts) as IWorkout[])
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
