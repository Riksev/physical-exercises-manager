import type { Dispatch, SetStateAction } from 'react'

interface IRecord {
   readonly date: string
   workouts: IWorkout[]
}

interface IWorkout {
   readonly _id: string
   exercise_id: string
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
   setWorkouts: Dispatch<SetStateAction<IRecord[]>>
}

interface IRemoveExerciseModalProps {
   setIsRemoveExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   exercises: IExercise[]
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
   setWorkouts: Dispatch<SetStateAction<IRecord[]>>
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
   setWorkouts: Dispatch<SetStateAction<IRecord[]>>
}

interface IExerciseProps {
   activeExercise: IExercise
   setActiveExercise: Dispatch<SetStateAction<IExercise>>
   exercises: IExercise[]
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   setActivePage: Dispatch<SetStateAction<string>>
   setWorkouts: Dispatch<SetStateAction<IRecord[]>>
}

interface IWorkoutsProps {
   exercises: IExercise[]
   activeExercise: IExercise
   setWorkouts: Dispatch<SetStateAction<IRecord[]>>
   workouts: IRecord[]
}

interface IListOfWorkoutsProps {
   workouts: IRecord[]
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
