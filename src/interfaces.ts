export type PageNames = 'exercises' | 'workouts' | 'statistics'

export const Pages = {
   EXERCISES: 'exercises' as const,
   WORKOUTS: 'workouts' as const,
   STATISTICS: 'statistics' as const,
}

export interface IWorkout {
   readonly _id: string
   date: string
   addedAt?: string
   exercises: IWorkoutExercise[]
}

export interface IWorkoutExercise {
   exercise_id: string
   addedAt?: string
   records: IRecord[]
}

export interface IRecord {
   readonly _id: string
   reps?: number
   weight?: number
   time?: string
   addedAt?: string
}

export interface IExercise {
   readonly _id: string
   name: string
   hasReps?: boolean
   hasWeight?: boolean
   hasTime?: boolean
}
