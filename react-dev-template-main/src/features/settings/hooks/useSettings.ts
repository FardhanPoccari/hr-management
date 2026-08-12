import { useState } from "react"

import {
  getSettings,
  saveSettings,
} from "../services/settings.service"

import type { Settings } from "../types"

export function useSettings() {
  const [settings, setSettings] = useState(
    getSettings()
  )

  function save(data: Settings) {
    saveSettings(data)
    setSettings(data)
  }

  return {
    settings,
    save,
  }
}