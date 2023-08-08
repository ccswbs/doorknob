import { useEffect, useState } from "react"

export const useMediaQuery = mq => {
  const [isMatch, setIsMatch] = useState(false)

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
