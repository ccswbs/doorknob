import { useEffect, useState } from "react"

// This hook allows you to use a media query in a React component. It returns a boolean value that indicates whether the media query matches or not. It accepts a media query string as a parameter. The media query string should be the same as what you would use in a CSS file. For example, "(min-width: 992px)".

//Note that due to how the browser handles the window.matchMedia function, using this hook for min-width, max-width, min-height and max-height queries will return a potentially incorrect value for when the page first loads. To avoid this, use the useWindowSize hook instead.

export const useMediaQuery = (mq) => {
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
