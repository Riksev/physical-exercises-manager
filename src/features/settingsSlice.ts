import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ISettings {
   unitsType: 'metric' | 'imperial'
   hasPlanning: boolean
   hasPlannedVolume: boolean
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
      hasPlanning:
         JSON.parse(localStorage.getItem('settings') ?? '{}')?.hasPlanning ??
         true,
      hasPlannedVolume:
         JSON.parse(localStorage.getItem('settings') ?? '{}')
            ?.hasPlannedVolume ?? true,
   },
}

const settingsSlice = createSlice({
   name: 'settings',
   initialState,
   reducers: {
      setSettings: (state, action: PayloadAction<ISettingsState>) => {
         state.settings.unitsType = action.payload.settings.unitsType
         state.settings.hasPlanning = action.payload.settings.hasPlanning
         state.settings.hasPlannedVolume =
            action.payload.settings.hasPlannedVolume
         localStorage.setItem('settings', JSON.stringify(state.settings))
      },
   },
})

export const { setSettings } = settingsSlice.actions
export default settingsSlice.reducer
