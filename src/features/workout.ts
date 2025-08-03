import type { IWorkout } from '../interfaces'

export const getWorkoutStartTime = (
   fromRecords: boolean,
   workout: IWorkout | undefined
) => {
   let start = '-'
   if (!fromRecords) {
      start = workout?.startTime || '-'
   }
   if (start === '-') {
      if (workout?.addedAt) {
         start = workout.addedAt
      }
      workout?.exercises.forEach((exercise) => {
         if (exercise?.addedAt) {
            if (start === '-') {
               start = exercise.addedAt
            } else {
               start = start < exercise.addedAt ? start : exercise.addedAt
            }
         }
         exercise.records.forEach((record) => {
            if (record?.addedAt) {
               if (start === '-') {
                  start = record.addedAt
               } else {
                  start = start < record.addedAt ? start : record.addedAt
               }
            }
         })
      })
   }
   return start
}

export const getWorkoutEndTime = (
   fromRecords: boolean,
   workout: IWorkout | undefined
) => {
   let end = '-'
   if (!fromRecords) {
      end = workout?.endTime || '-'
   }
   if (end === '-') {
      if (workout?.addedAt) {
         end = workout.addedAt
      }
      workout?.exercises.forEach((exercise) => {
         if (exercise?.addedAt) {
            if (end === '-') {
               end = exercise.addedAt
            } else {
               end = end > exercise.addedAt ? end : exercise.addedAt
            }
         }
         exercise.records.forEach((record) => {
            if (record?.addedAt) {
               if (end === '-') {
                  end = record.addedAt
               } else {
                  end = end > record.addedAt ? end : record.addedAt
               }
            }
         })
      })
   }
   return end
}
