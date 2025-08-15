import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../features/dataSlice'
import settingsReducer from '../features/settingsSlice'

export const store = configureStore({
   reducer: {
      data: dataReducer,
      settings: settingsReducer,
   },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
