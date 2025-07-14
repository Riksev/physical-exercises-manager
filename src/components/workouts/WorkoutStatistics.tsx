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

   type ExerciseTimeRange = {
      name: string
      duration: string
   }

   const [exerciseTimeRanges, setExerciseTimeRanges] = useState<
      Map<string, ExerciseTimeRange>
   >(new Map())

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

         const exerciseDuration: Map<string, ExerciseTimeRange> = new Map<
            string,
            ExerciseTimeRange
         >()
         let workoutVolume: number = volume

         for (const exercise of activeWorkout.exercises) {
            let minExerciseTime: string = '-'
            let maxExerciseTime: string = '-'

            for (const record of exercise.records) {
               // Exercise time calculation
               const currentRecordTime = record?.addedAt
               if (currentRecordTime) {
                  if (
                     minExerciseTime === '-' ||
                     currentRecordTime < minExerciseTime
                  ) {
                     minExerciseTime = currentRecordTime
                  }
                  if (
                     maxExerciseTime === '-' ||
                     currentRecordTime > maxExerciseTime
                  ) {
                     maxExerciseTime = currentRecordTime
                  }
               }

               // Workout volume calculation
               const currentReps = record?.reps
               const currentWeight = record?.weight
               if (currentReps && currentWeight) {
                  workoutVolume += currentReps * currentWeight
               }
            }

            // Workout time calculation
            if (minExerciseTime !== '-') {
               if (minTime === '-' || minExerciseTime < minTime) {
                  minTime = minExerciseTime
               }
            }
            if (maxExerciseTime !== '-') {
               if (maxTime === '-' || maxExerciseTime > maxTime) {
                  maxTime = maxExerciseTime
               }
            }
            exerciseDuration.set(exercise.exercise_id, {
               name:
                  exercises.find((ex) => ex._id === exercise.exercise_id)
                     ?.name || 'Невідома вправа',
               duration: getDurationString(minExerciseTime, maxExerciseTime),
            })
         }

         setStartTime(minTime)
         setEndTime(maxTime)
         setDuration(getDurationString(minTime, maxTime))
         setExerciseTimeRanges(exerciseDuration)
         setVolume(workoutVolume)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
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
            <details className="details mt-4">
               <summary className="text-center font-bold uppercase">
                  вправи
               </summary>
               <h2 className="horizontal-line"></h2>
               <table>
                  <caption>Час виконання вправ</caption>
                  <thead>
                     <tr>
                        <th scope="col">№</th>
                        <th scope="col">вправа</th>
                        <th scope="col">тривалість</th>
                     </tr>
                  </thead>
                  <tbody>
                     {Array.from(exerciseTimeRanges.entries()).map(
                        ([exerciseId, timeRange], index) => (
                           <tr key={exerciseId}>
                              <td>{index + 1}</td>
                              <td>{timeRange.name}</td>
                              <td>{timeRange.duration}</td>
                           </tr>
                        )
                     )}
                  </tbody>
               </table>
            </details>
         </details>
         <details className="details">
            <summary className="text-center font-bold uppercase">об'єм</summary>
            <h2 className="horizontal-line"></h2>
            <p>Виконаний об'єм: {volume}</p>
         </details>
      </details>
   )
}

export default WorkoutStatistics
