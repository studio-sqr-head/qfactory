import { useEffect, useState } from "react"
import { theme } from "tailwindcss/defaultConfig"

export const useBreakpoint = ({
  breakpoint,
}: {
  breakpoint: "sm" | "md" | "lg" | "xl" | "2xl"
}): boolean => {
  const [isBreakpoint, setIsBreakpoint] = useState(false)

  useEffect(() => {
    if (theme?.screens === undefined) {
      return
    }
    const mediaQuery = window.matchMedia(
      `(min-width: ${theme.screens?.[breakpoint as keyof typeof theme.screens]})`
    )
    const handler = () => setIsBreakpoint(mediaQuery.matches)
    mediaQuery.addEventListener("change", handler)
    handler()
    return () => mediaQuery.removeEventListener("change", handler)
  }, [breakpoint])

  return isBreakpoint
}
