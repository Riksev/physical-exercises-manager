import type { Dispatch, SetStateAction } from 'react'

export type PageNames = 'exercises' | 'workouts' | 'statistics'

export const Pages = {
   EXERCISES: 'exercises' as const,
   WORKOUTS: 'workouts' as const,
   STATISTICS: 'statistics' as const,
}

export interface IWorkout {
   readonly _id: string
   date: string
   exercises: IWorkoutExercise[]
   // Workouts was renamed to exercises in the original code, but keeping it for compatibility
   workouts?: {
      _id: string
      exercise_id: string
      reps?: number
      weight?: number
      time?: string
   }[]
}

export interface IWorkoutExercise {
   exercise_id: string
   records: IRecord[]
}

export interface IRecord {
   readonly _id: string
   reps?: number
   weight?: number
   time?: string
}

export interface IExercise {
   readonly _id: string
   name: string
   hasReps?: boolean
   hasWeight?: boolean
   hasTime?: boolean
}
export interface IListOfExercisesProps {
   exercises: IExercise[]
   clicker?: (exercise: IExercise) => void
   showAll?: boolean
}

export interface IBlockExerciseProps {
   exercise: IExercise
   clicker?: (exercise: IExercise) => void
}

export interface IAddExerciseModalProps {
   setIsAddExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   setExercises: Dispatch<SetStateAction<IExercise[]>>
}

export interface IAddWorkoutModalProps {
   setIsAddWorkoutModalOpen: Dispatch<SetStateAction<boolean>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
}

export interface IRemoveExerciseModalProps {
   setIsRemoveExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   activeExercise: IExercise
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
}

export interface IEditExerciseModalProps {
   setIsEditExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   activeExercise: IExercise
}

export interface IMenuProps {
   activePage: PageNames
   setActivePage: Dispatch<SetStateAction<PageNames>>
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   scrollRef: React.RefObject<HTMLDivElement | null>
}

export interface IExercisesProps {
   exercises: IExercise[]
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   activeExercise: IExercise | null
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
}

export interface IExerciseProps {
   activeExercise: IExercise
   setExercises: Dispatch<SetStateAction<IExercise[]>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   setActiveExercise: Dispatch<SetStateAction<IExercise | null>>
}

export interface IWorkoutsProps {
   exercises: IExercise[]
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   filteredWorkouts: IWorkout[]
   setFilteredWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   dateBegin: string
   setDateBegin: Dispatch<SetStateAction<string>>
   dateEnd: string
   setDateEnd: Dispatch<SetStateAction<string>>
   isFiltered: boolean
   setIsFiltered: Dispatch<SetStateAction<boolean>>
   selectedExercise: IExercise | null
   setSelectedExercise: Dispatch<SetStateAction<IExercise | null>>
   workouts: IWorkout[]
   activeWorkout: IWorkout | null
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   scrollRef: React.RefObject<HTMLDivElement | null>
}

export interface IListOfWorkoutsProps {
   workouts: IWorkout[]
   exercises: IExercise[]
   clicker: (workout: IWorkout) => void
}

export interface IBlockWorkoutProps {
   workout: IWorkout
   exercises: IExercise[]
   clicker: (workout: IWorkout) => void
}

export interface IWorkoutProps {
   activeWorkout: IWorkout
   setActiveWorkout: Dispatch<SetStateAction<IWorkout | null>>
   exercises: IExercise[]
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
}

export interface IAddExerciseToWorkoutModalProps {
   setAddExerciseToWorkoutModalOpen: Dispatch<SetStateAction<boolean>>
   exercises: IExercise[]
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   workout: IWorkout
}

export interface IRemoveWorkoutModalProps {
   setIsRemoveWorkoutModalOpen: Dispatch<SetStateAction<boolean>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   activeWorkout: IWorkout
}

export interface IRemoveExerciseFromWorkoutModalProps {
   setIsRemoveExerciseFromWorkoutModalOpen: Dispatch<SetStateAction<boolean>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   activeWorkout: IWorkout
   selectedExercise: IExercise
}

export interface ISelectExerciseModalProps {
   setIsSelectExerciseModalOpen: Dispatch<SetStateAction<boolean>>
   clicker: (exercise: IExercise) => void
   exercises: IExercise[]
}

export interface IAddRecordModalProps {
   setIsAddRecordModalOpen: Dispatch<SetStateAction<boolean>>
   selectedExercise: IExercise
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   selectedWorkout: IWorkout
}

export interface IEditWorkoutModalProps {
   setIsEditWorkoutModalOpen: Dispatch<SetStateAction<boolean>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   activeWorkout: IWorkout
}

export interface IRemoveRecordModalProps {
   setIsRemoveRecordModalOpen: Dispatch<SetStateAction<boolean>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   selectedWorkout: IWorkout
   selectedExercise: IExercise
   selectedRecord: IRecord
}

export interface IEditRecordModalProps {
   setIsEditRecordModalOpen: Dispatch<SetStateAction<boolean>>
   setWorkouts: Dispatch<SetStateAction<IWorkout[]>>
   selectedWorkout: IWorkout
   selectedExercise: IExercise
   selectedRecord: IRecord
}

export interface IOtherProps {
   exercises: IExercise[]
   workouts: IWorkout[]
   setData: (exercises: IExercise[], workouts: IWorkout[]) => void
}
export interface IDataControllerProps {
   exercises: IExercise[]
   workouts: IWorkout[]
   setData: (exercises: IExercise[], workouts: IWorkout[]) => void
}
export interface IExportDataModalProps {
   exercises: IExercise[]
   workouts: IWorkout[]
   setIsDataExportModalOpen: Dispatch<SetStateAction<boolean>>
}
export interface IImportDataModalProps {
   exercises: IExercise[]
   workouts: IWorkout[]
   setData: (exercises: IExercise[], workouts: IWorkout[]) => void
   setIsDataImportModalOpen: Dispatch<SetStateAction<boolean>>
}
export interface IRemoveDataModalProps {
   setData: (exercises: IExercise[], workouts: IWorkout[]) => void
   setIsDataRemoveModalOpen: Dispatch<SetStateAction<boolean>>
}
