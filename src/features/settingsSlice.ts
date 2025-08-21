import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ISettings {
   language: 'uk' | 'en' | 'ru'
   unitsType: 'metric' | 'imperial'
   hasPlanning: boolean
   hasPlannedVolume: boolean
   theme: 'system' | 'light' | 'dark'
}

interface ISettingsState {
   settings: ISettings
}

const getLanguageFromNavigator = () => {
   const languages = navigator.languages
   for (const lang of languages) {
      if (
         lang.startsWith('uk') ||
         lang.startsWith('en') ||
         lang.startsWith('ru')
      ) {
         return lang.startsWith('uk')
            ? 'uk'
            : lang.startsWith('ru')
              ? 'ru'
              : 'en'
      }
   }
   return 'en'
}

const initialState: ISettingsState = {
   settings: {
      language:
         JSON.parse(localStorage.getItem('settings') ?? '{}')?.language ??
         getLanguageFromNavigator(),
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
      theme:
         JSON.parse(localStorage.getItem('settings') ?? '{}')?.theme ??
         'system',
   },
}

const settingsSlice = createSlice({
   name: 'settings',
   initialState,
   reducers: {
      setSettings: (state, action: PayloadAction<ISettingsState>) => {
         state.settings.language = action.payload.settings.language
         state.settings.unitsType = action.payload.settings.unitsType
         state.settings.hasPlanning = action.payload.settings.hasPlanning
         state.settings.hasPlannedVolume =
            action.payload.settings.hasPlannedVolume
         state.settings.theme = action.payload.settings.theme
         localStorage.setItem('settings', JSON.stringify(state.settings))
      },
   },
})

export const { setSettings } = settingsSlice.actions
export default settingsSlice.reducer
