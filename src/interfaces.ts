export const Pages = {
   EXERCISES: 0,
   WORKOUTS: 1,
   STATISTICS: 2,
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

export interface IModal {
   action: string | null
   item: string | null
   data: {
      activeExercise?: IExercise
      activeWorkout?: IWorkout
      selectedExercise?: IExercise
      selectedRecord?: IRecord
   } | null
}
