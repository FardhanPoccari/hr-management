import { settingsData } from "../data"
import type { Settings } from "../types"

let settings: Settings = {
  ...settingsData,
}

export function getSettings() {
  return settings
}

export function saveSettings(
  newSettings: Settings
) {
  settings = {
    ...newSettings,
  }
}