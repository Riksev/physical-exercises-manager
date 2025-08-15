import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ISettings {
   unitsType: 'metric' | 'imperial'
}

interface ISettingsState {
   settings: ISettings
}

const initialState: ISettingsState = {
   settings: {
      unitsType:
         JSON.parse(localStorage.getItem('settings') ?? '{}')?.unitsType ===
         'imperial'
            ? 'imperial'
            : 'metric',
   },
}

const settingsSlice = createSlice({
   name: 'settings',
   initialState,
   reducers: {
      setSettings: (state, action: PayloadAction<ISettingsState>) => {
         state.settings.unitsType = action.payload.settings.unitsType
         localStorage.setItem('settings', JSON.stringify(state.settings))
      },
   },
})

export const { setSettings } = settingsSlice.actions
export default settingsSlice.reducer
