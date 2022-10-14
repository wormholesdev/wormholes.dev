import { useCallback, useEffect, useState } from 'react'

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
]

function useThemePicker() {
  const [selectedTheme, setSelectedTheme] = useState()
  const [currentIndex, setCurrentIndex] = useState()

  const isCurrentTheme = (theme) => window.localStorage.theme === theme
  const isSystemTheme = (theme) =>
    window.matchMedia(`(prefers-color-scheme: ${theme})`).matches

  const updateClasses = useCallback((theme) => {
    const classes = document.documentElement.classList
    if (theme === 'dark') {
      classes.add('dark')
    } else if (theme === 'light') {
      classes.remove('dark')
    } else if (isSystemTheme('dark')) {
      classes.add('dark')
    } else if (isSystemTheme('light')) {
      classes.remove('dark')
    }
  }, [])

  const forceSelectTheme = useCallback(
    (theme) => {
      const nextTheme = themes.find((t) => t.value === theme)
      const nextIndex = themes.findIndex((t) => t.value === theme)
      setCurrentIndex(nextIndex)
      setSelectedTheme(nextTheme)
      document.documentElement.setAttribute('data-theme', theme)
      updateClasses(theme)
    },
    [updateClasses]
  )

  useEffect(() => {
    if (isCurrentTheme('dark')) {
      forceSelectTheme('dark')
    } else if (isCurrentTheme('light')) {
      forceSelectTheme('light')
    } else {
      forceSelectTheme('system')
    }
  }, [forceSelectTheme])

  const selectTheme = () => {
    const nextIndex = currentIndex === themes.length - 1 ? 0 : currentIndex + 1
    const nextTheme = themes[nextIndex]
    setCurrentIndex(nextIndex)
    setSelectedTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme.value)
    try {
      if (nextTheme.value === 'system') {
        window.localStorage.removeItem('theme')
      } else {
        window.localStorage.setItem('theme', nextTheme.value)
      }
    } catch {}
    updateClasses(nextTheme.value)
  }

  return [selectedTheme, selectTheme]
}

export default useThemePicker
