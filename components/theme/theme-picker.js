import { MoonStarsFill, SunFill } from 'react-bootstrap-icons'
import useThemePicker from './useThemePicker'

export function ThemePicker() {
  const [selectedTheme, selectTheme] = useThemePicker()

  return (
    <button
      className='flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-200 ease-in hover:-rotate-12'
      aria-label={selectedTheme?.name}
      onClick={selectTheme}
    >
      <SunFill className='hidden h-5 w-5 fill-yellow-500 [[data-theme=light]_&]:block' />
      <MoonStarsFill className='hidden h-5 w-5 fill-blue-500 [[data-theme=dark]_&]:block' />
      <SunFill className='hidden h-5 w-5 fill-slate-400 [:not(.dark)[data-theme=system]_&]:block' />
      <MoonStarsFill className='hidden h-5 w-5 fill-slate-400 [.dark[data-theme=system]_&]:block' />
    </button>
  )
}
