import type { IRecord, IWorkout, IWorkoutExercise } from '../interfaces'

const getNewTime = (
   time: string,
   el: IWorkout | IWorkoutExercise | IRecord | undefined,
   less: boolean
): string => {
   if (el?.addedAt && el?.addedAt !== '-') {
      if (time === '-') {
         return el.addedAt
      }
      return less
         ? time < el.addedAt
            ? time
            : el.addedAt
         : time > el.addedAt
           ? time
           : el.addedAt
   }
   return time
}

export const getWorkoutTime = (
   fromRecords: boolean,
   workout: IWorkout | undefined,
   whichTime: 'start' | 'end'
) => {
   let time = '-'
   const isStartTime = whichTime === 'start'
   if (!fromRecords) {
      time =
         whichTime === 'start'
            ? (workout?.startTime ?? '-')
            : (workout?.endTime ?? '-')
   } else {
      time = getNewTime(time, workout, isStartTime)
      workout?.exercises.forEach((exercise) => {
         time = getNewTime(time, exercise, isStartTime)
         exercise.records.forEach((record) => {
            time = getNewTime(time, record, isStartTime)
         })
      })
   }
   return time
}
