import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import type { IModal, IWorkout } from '../../interfaces'
import { useAppSelector } from '../../app/hooks'
import { getWorkoutTime } from '../../features/workout'
import { useTranslation } from 'react-i18next'

interface IWorkoutStatisticsProps {
   activeWorkout: IWorkout
   isAnyModalOpen: boolean
   setModal: Dispatch<SetStateAction<IModal | null>>
}

const WorkoutStatistics = ({
   activeWorkout,
   isAnyModalOpen,
   setModal,
}: IWorkoutStatisticsProps) => {
   const exercises = useAppSelector((state) => state.data.exercises)
   const settings = useAppSelector((state) => state.settings.settings)
   const { t } = useTranslation()

   const startTime = getWorkoutTime(false, activeWorkout, 'start')
   const endTime = getWorkoutTime(false, activeWorkout, 'end')
   const [duration, setDuration] = useState<string>('-')
   const [volume, setVolume] = useState<number>(0)
   const [plannedVolume, setPlannedVolume] = useState<number>(0)
   const [setsTotal, setSetsTotal] = useState<number>(0)
   const [repsTotal, setRepsTotal] = useState<number>(0)

   type ExerciseInfo = {
      name: string
      sets?: number
      reps?: number
      volume?: number
      plannedVolume?: number
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
            Math.ceil((diff % 60000) / 1000)
         ).padStart(2, '0')

         return `${hours}:${minutes}:${seconds}`
      }
      return '-'
   }

   useEffect(() => {
      if (!isAnyModalOpen) {
         const exerciseInfoLocal: Map<string, ExerciseInfo> = new Map<
            string,
            ExerciseInfo
         >()
         let workoutVolume: number = 0
         let workoutPlannedVolume: number = 0
         let setsGlobal: number = 0
         let repsGlobal: number = 0

         for (const exercise of activeWorkout.exercises) {
            let setsLocal: number = 0
            let repsLocal: number = 0
            let localVolume: number = 0
            let localPlannedVolume: number = 0

            const exerciseData = exercises.find(
               (ex) => ex._id === exercise.exercise_id
            )

            for (const record of exercise.records) {
               // Workout volume calculation
               const currentReps = record?.reps
               const currentWeight = record?.weight
               if (
                  exerciseData?.hasWeight &&
                  currentWeight &&
                  currentWeight > 0
               ) {
                  const currentVolume = (currentReps ?? 1) * currentWeight
                  if (record.done ?? true) {
                     localVolume += currentVolume
                     workoutVolume += currentVolume
                  }
                  localPlannedVolume += currentVolume
                  workoutPlannedVolume += currentVolume
               }

               if (
                  (exerciseData?.hasReps ||
                     exerciseData?.hasWeight ||
                     exerciseData?.hasTime) &&
                  (record.done ?? true)
               ) {
                  setsLocal += 1
               }

               if (record.done ?? true) {
                  repsLocal += currentReps || 0
               }
            }

            exerciseInfoLocal.set(exercise.exercise_id, {
               name: exerciseData?.name || 'Невідома вправа',
               ...(exerciseData?.hasReps ||
               exerciseData?.hasWeight ||
               exerciseData?.hasTime
                  ? {
                       sets:
                          (exerciseInfoLocal.get(exercise.exercise_id)?.sets ??
                             0) + setsLocal,
                    }
                  : {}),
               ...(exerciseData?.hasReps
                  ? {
                       reps:
                          (exerciseInfoLocal.get(exercise.exercise_id)?.reps ??
                             0) + repsLocal,
                    }
                  : {}),
               ...(exerciseData?.hasWeight
                  ? {
                       volume:
                          (exerciseInfoLocal.get(exercise.exercise_id)
                             ?.volume ?? 0) + localVolume,
                       plannedVolume:
                          (exerciseInfoLocal.get(exercise.exercise_id)
                             ?.plannedVolume ?? 0) + localPlannedVolume,
                    }
                  : {}),
            })

            setsGlobal += setsLocal
            repsGlobal += repsLocal
         }
         setDuration(getDurationString(startTime, endTime))
         setExerciseInfo(exerciseInfoLocal)
         setVolume(workoutVolume)
         setPlannedVolume(workoutPlannedVolume)
         setSetsTotal(setsGlobal)
         setRepsTotal(repsGlobal)
      }
   }, [activeWorkout, endTime, exercises, isAnyModalOpen, startTime])

   return (
      <details className="details">
         <summary>{t('workouts.workout.statistics.title')}</summary>
         <details className="details mt-4">
            <summary className="text-center font-bold uppercase">
               {t('workouts.workout.statistics.time')}
            </summary>
            <h2 className="horizontal-line"></h2>
            <div className="flex w-full flex-row items-center justify-between gap-2">
               <p>
                  {t('workouts.workout.statistics.begin')}:{' '}
                  <br className="block sm:hidden"></br>
                  {startTime === '-'
                     ? startTime
                     : getTimeString(new Date(startTime))}
               </p>
               <button
                  onClick={() => {
                     setModal({
                        action: 'setStartTime',
                        item: 'workout',
                        data: {
                           activeWorkout,
                        },
                     })
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 640 640"
                     className="h-6 w-6 fill-fuchsia-800 stroke-black stroke-[6]"
                  >
                     <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
                  </svg>
               </button>
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-2">
               <p>
                  {t('workouts.workout.statistics.end')}:{' '}
                  <br className="block sm:hidden"></br>
                  {endTime === '-' ? endTime : getTimeString(new Date(endTime))}
               </p>
               <button
                  onClick={() => {
                     setModal({
                        action: 'setEndTime',
                        item: 'workout',
                        data: {
                           activeWorkout,
                        },
                     })
                  }}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 640 640"
                     className="h-6 w-6 fill-fuchsia-800 stroke-black stroke-[6]"
                  >
                     <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
                  </svg>
               </button>
            </div>
            <p>
               {t('workouts.workout.statistics.duration')}:{' '}
               <br className="block sm:hidden"></br>
               {duration}
            </p>
         </details>
         <details className="details">
            <summary className="text-center font-bold uppercase">
               {t('workouts.workout.statistics.count')}
            </summary>
            <h2 className="horizontal-line"></h2>
            <p>
               {t('workouts.workout.statistics.exercisesCount')}:{' '}
               {
                  new Set(activeWorkout.exercises.map((ex) => ex.exercise_id))
                     .size
               }
            </p>
            <table className="mt-4">
               <thead>
                  <tr>
                     <th scope="col">
                        {t('workouts.workout.statistics.exercise')}
                     </th>
                     <th scope="col">
                        {t('workouts.workout.statistics.sets')}
                     </th>
                     <th scope="col">
                        {t('workouts.workout.statistics.reps')}
                     </th>
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
                     <td>{t('workouts.workout.statistics.total')}</td>
                     <td>{setsTotal === 0 ? '-' : setsTotal}</td>
                     <td>{repsTotal === 0 ? '-' : repsTotal}</td>
                  </tr>
               </tbody>
            </table>
         </details>
         <details className="details">
            <summary className="text-center font-bold uppercase">
               {t('workouts.workout.statistics.volume')}
            </summary>
            <h2 className="horizontal-line"></h2>
            <table>
               <thead>
                  <tr>
                     <th scope="col">
                        {t('workouts.workout.statistics.exercise')}
                     </th>
                     <th scope="col">
                        {t('workouts.workout.statistics.volume')}
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {Array.from(exerciseInfo.entries()).map(
                     ([exerciseId, info]) => {
                        if (info?.volume && info?.plannedVolume) {
                           return (
                              <tr key={exerciseId}>
                                 <td>{info.name}</td>
                                 <td>
                                    {(info?.volume ?? '-') +
                                       (settings.hasPlannedVolume
                                          ? ' / ' + (info?.plannedVolume ?? '-')
                                          : '')}
                                 </td>
                              </tr>
                           )
                        }
                     }
                  )}
                  <tr>
                     <td>{t('workouts.workout.statistics.total')}</td>
                     <td>
                        {(volume === 0 ? '-' : volume) +
                           (settings.hasPlannedVolume
                              ? ' / ' +
                                (plannedVolume === 0 ? '-' : plannedVolume)
                              : '')}
                     </td>
                  </tr>
               </tbody>
            </table>
         </details>
      </details>
   )
}

export default WorkoutStatistics
