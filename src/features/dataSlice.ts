import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IExercise, IWorkout } from '../interfaces'

interface IDataState {
   exercises: IExercise[]
   workouts: IWorkout[]
}

const initialState: IDataState = {
   exercises: JSON.parse(localStorage.getItem('exercises') || '[]'),
   workouts: JSON.parse(localStorage.getItem('workouts') || '[]'),
}

const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
      setExercises: (state, action: PayloadAction<IExercise[]>) => {
         state.exercises = action.payload
         localStorage.setItem('exercises', JSON.stringify(action.payload))
      },
      setWorkouts: (state, action: PayloadAction<IWorkout[]>) => {
         state.workouts = action.payload
         localStorage.setItem('workouts', JSON.stringify(action.payload))
      },
   },
})

export const { setExercises, setWorkouts } = dataSlice.actions
export default dataSlice.reducer
