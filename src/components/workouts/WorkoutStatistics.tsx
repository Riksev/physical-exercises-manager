import { useEffect, useState } from 'react'
import type { IWorkoutStatisticsProps } from '../../interfaces'

const WorkoutStatistics = ({
   activeWorkout,
   isAddRecordModalOpen,
   isEditRecordModalOpen,
   isRemoveRecordModalOpen,
   isAddExerciseToWorkoutModalOpen,
   isRemoveExerciseFromWorkoutModalOpen,
   exercises,
}: IWorkoutStatisticsProps) => {
   const [startTime, setStartTime] = useState<string>('-')
   const [endTime, setEndTime] = useState<string>('-')
   const [duration, setDuration] = useState<string>('-')
   const [volume, setVolume] = useState<number>(0)
   const [setsTotal, setSetsTotal] = useState<number>(0)
   const [repsTotal, setRepsTotal] = useState<number>(0)

   type ExerciseInfo = {
      name: string
      sets: number
      reps?: number
      volume?: number
   }

   const [exerciseInfo, setExerciseInfo] = useState<Map<string, ExerciseInfo>>(
      new Map()
   )

   const getTimeString = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
   }

   const getDurationString = (
      startString: string,
      endString: string
   ): string => {
      if (startString !== '-' && endString !== '-') {
         const start: Date = new Date(startString)
         const end: Date = new Date(endString)
         if (end.getTime() < start.getTime()) {
            return '-'
         }
         const diff: number = end.getTime() - start.getTime()
         const hours: string = String(Math.floor(diff / 3600000)).padStart(
            2,
            '0'
         )
         const minutes: string = String(
            Math.floor((diff % 3600000) / 60000)
         ).padStart(2, '0')
         const seconds: string = String(
            Math.floor((diff % 60000) / 1000)
         ).padStart(2, '0')

         return `${hours} год. ${minutes} хв. ${seconds} сек.`
      }
      return '-'
   }

   useEffect(() => {
      if (
         !isAddRecordModalOpen ||
         !isEditRecordModalOpen ||
         !isRemoveRecordModalOpen ||
         !isAddExerciseToWorkoutModalOpen ||
         !isRemoveExerciseFromWorkoutModalOpen
      ) {
         let minTime: string = '-'
         let maxTime: string = '-'

         const exerciseInfoLocal: Map<string, ExerciseInfo> = new Map<
            string,
            ExerciseInfo
         >()
         let workoutVolume: number = 0
         let setsGlobal: number = 0
         let repsGlobal: number = 0

         if (activeWorkout?.addedAt) {
            minTime = activeWorkout.addedAt
            maxTime = activeWorkout.addedAt
         }

         for (const exercise of activeWorkout.exercises) {
            let setsLocal: number = 0
            let repsLocal: number = 0
            let localVolume: number = 0

            if (exercise.addedAt) {
               if (minTime === '-' || exercise.addedAt < minTime) {
                  minTime = exercise.addedAt
               }
               if (maxTime === '-' || exercise.addedAt > maxTime) {
                  maxTime = exercise.addedAt
               }
            }

            for (const record of exercise.records) {
               // Exercise time calculation
               const currentRecordTime = record?.addedAt
               if (currentRecordTime) {
                  if (minTime === '-' || currentRecordTime < minTime) {
                     minTime = currentRecordTime
                  }
                  if (maxTime === '-' || currentRecordTime > maxTime) {
                     maxTime = currentRecordTime
                  }
               }

               // Workout volume calculation
               const currentReps = record?.reps
               const currentWeight = record?.weight
               if (currentWeight) {
                  const currentVolume = (currentReps ?? 1) * currentWeight
                  localVolume += currentVolume
                  workoutVolume += currentVolume
               }

               setsLocal += 1
               repsLocal += currentReps || 0
            }
            const exerciseData = exercises.find(
               (ex) => ex._id === exercise.exercise_id
            )
            exerciseInfoLocal.set(exercise.exercise_id, {
               name: exerciseData?.name || 'Невідома вправа',
               sets: setsLocal,
               ...(exerciseData?.hasReps ? { reps: repsLocal } : {}),
               ...(exerciseData?.hasWeight ? { volume: localVolume } : {}),
            })

            setsGlobal += setsLocal
            repsGlobal += repsLocal
         }

         setStartTime(minTime)
         setEndTime(maxTime)
         setDuration(getDurationString(minTime, maxTime))
         setExerciseInfo(exerciseInfoLocal)
         setVolume(workoutVolume)
         setSetsTotal(setsGlobal)
         setRepsTotal(repsGlobal)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
      activeWorkout,
      isAddRecordModalOpen,
      isEditRecordModalOpen,
      isRemoveRecordModalOpen,
      isAddExerciseToWorkoutModalOpen,
      isRemoveExerciseFromWorkoutModalOpen,
   ])

   return (
      <details className="details">
         <summary>Статистика</summary>
         <details className="details mt-4">
            <summary className="text-center font-bold uppercase">час</summary>
            <h2 className="horizontal-line"></h2>
            <p>
               Початок:{' '}
               {startTime === '-'
                  ? startTime
                  : getTimeString(new Date(startTime))}
            </p>
            <p>
               Кінець:{' '}
               {endTime === '-' ? endTime : getTimeString(new Date(endTime))}
            </p>
            <p>Тривалість: {duration}</p>
         </details>
         <details className="details">
            <summary className="text-center font-bold uppercase">
               кількість
            </summary>
            <h2 className="horizontal-line"></h2>
            <p>Кількість вправ: {activeWorkout.exercises.length}</p>
            <table className="mt-4">
               <thead>
                  <tr>
                     <th scope="col">вправа</th>
                     <th scope="col">підходи</th>
                     <th scope="col">повтори</th>
                  </tr>
               </thead>
               <tbody>
                  {Array.from(exerciseInfo.entries()).map(
                     ([exerciseId, info]) => (
                        <tr key={exerciseId}>
                           <td>{info.name}</td>
                           <td>{info?.sets ?? '-'}</td>
                           <td>{info?.reps ?? '-'}</td>
                        </tr>
                     )
                  )}
                  <tr>
                     <td>Всього</td>
                     <td>{setsTotal}</td>
                     <td>{repsTotal}</td>
                  </tr>
               </tbody>
            </table>
         </details>
         <details className="details">
            <summary className="text-center font-bold uppercase">об'єм</summary>
            <h2 className="horizontal-line"></h2>
            <table>
               <thead>
                  <tr>
                     <th scope="col">вправа</th>
                     <th scope="col">об'єм</th>
                  </tr>
               </thead>
               <tbody>
                  {Array.from(exerciseInfo.entries()).map(
                     ([exerciseId, info]) => {
                        if (info?.volume) {
                           return (
                              <tr key={exerciseId}>
                                 <td>{info.name}</td>
                                 <td>{info?.volume ?? '-'}</td>
                              </tr>
                           )
                        }
                     }
                  )}
                  <tr>
                     <td>Всього</td>
                     <td>{volume}</td>
                  </tr>
               </tbody>
            </table>
         </details>
      </details>
   )
}

export default WorkoutStatistics
