import type { Dispatch, SetStateAction } from 'react'

interface IWorkout {
   readonly date: string
   exercises: {
      exercise_id: string
      records: IRecord[]
   }[]
}

interface IRecord {
   reps?: number
   weight?: number
   time?: string
}

interface IExercise {
   readonly _id: string
   name: string
   hasReps: boolean
   hasWeight: boolean
   hasTime: boolean
}

interface IListOfExercisesProps {
   exercises: IExercise[]
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
}

interface IAddExerciseModalProps {
   setIsAddExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   setExercises: Dispatch<SetStateAction<IExercise[]>>
}

interface IAddWorkoutModalProps {
   setIsAddWorkoutModalOpen: Dispatch<SetStateAction<boolean>>
   selectedExerciseName: string
   exercises: IExercise[]
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
}

interface IRemoveExerciseModalProps {
   setIsRemoveExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   exercises: IExercise[]
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
}

interface IEditExerciseModalProps {
   setIsEditExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   exercises: IExercise[]
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
}

interface IMenuProps {
   activePage: string
   setActivePage: Dispatch<SetStateAction<string>>
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
}

interface IExercisesProps {
   exercises: IExercise[]
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
   setActivePage: Dispatch<SetStateAction<string>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
}

interface IExerciseProps {
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
   exercises: IExercise[]
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   setActivePage: Dispatch<SetStateAction<string>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
}

interface IWorkoutsProps {
   exercises: IExercise[]
   activeExercise: IExercise
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   workouts: IWorkout[]
}

interface IListOfWorkoutsProps {
   workouts: IWorkout[]
   exercises: IExercise[]
}

export type {
   IWorkout,
   IExercise,
   IListOfExercisesProps,
   IAddExerciseModalProps,
   IAddWorkoutModalProps,
   IRemoveExerciseModalProps,
   IEditExerciseModalProps,
   IMenuProps,
   IExercisesProps,
   IExerciseProps,
   IWorkoutsProps,
   IRecord,
   IListOfWorkoutsProps,
}
