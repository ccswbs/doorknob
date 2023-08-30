import { useEffect, useState } from "react"

export const useMediaQuery = (mq, initial = false) => {
  const [isMatch, setIsMatch] = useState(typeof window !== "undefined" ? window.matchMedia(mq).matches : initial)

  const onMediaQueryChange = e => {
    setIsMatch(e.matches)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia(mq)

    setIsMatch(mediaQuery.matches)
    mediaQuery.addEventListener("change", onMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener("change", onMediaQueryChange)
    }
  }, [mq])

  return isMatch
}
