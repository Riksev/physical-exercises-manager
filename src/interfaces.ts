export const Pages = {
   EXERCISES: 0,
   WORKOUTS: 1,
   STATISTICS: 2,
}

export interface IWorkout {
   readonly _id: string
   date: string
   addedAt?: string
   name?: string
   difficulty?: string
   exercises: IWorkoutExercise[]
   startTime?: string
   endTime?: string
   notes?: string
   done?: boolean
}

export interface IWorkoutExercise {
   readonly _id: string
   exercise_id: string
   addedAt?: string
   done?: boolean
   records: IRecord[]
}

export interface IRecord {
   readonly _id: string
   reps?: number
   weight?: number
   time?: string
   rpe?: number
   rir?: number
   addedAt?: string
   done?: boolean
}

export interface IExercise {
   readonly _id: string
   name: string
   hasReps?: boolean
   hasWeight?: boolean
   hasTime?: boolean
   notes?: string
   hasRPE?: boolean
   hasRIR?: boolean
}

export interface IModal {
   action: string | null
   item: string | null
   data: {
      activeExercise?: IExercise
      activeWorkout?: IWorkout
      selectedExerciseFromWorkout?: IWorkoutExercise
      selectedExerciseInfo?: IExercise
      selectedRecord?: IRecord
      date?: Date
   } | null
}
