import { useEffect, useState } from "react"

export const useWindowSize = () => {
  const isBrowser = typeof window === "object"
  const [windowSize, setWindowSize] = useState({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  })

  const onWindowResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    onWindowResize()
    window.addEventListener("resize", onWindowResize, { passive: true })

    return () => {
      window.removeEventListener("resize", onWindowResize, { passive: true })
    }
  }, [])

  return windowSize
}
