import { useEffect, useState } from "react";

// This hook allows you to use a media query in a React component. It returns a boolean value that indicates whether the media query matches or not. It accepts a media query string as a parameter. The media query string should be the same as what you would use in a CSS file. For example, "(min-width: 992px)".

export const useMediaQuery = mq => {
  const [isMatch, setIsMatch] = useState(false);

  const onMediaQueryChange = e => {
    setIsMatch(e.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(mq);

    setIsMatch(mediaQuery.matches);
    mediaQuery.addEventListener("change", onMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", onMediaQueryChange);
    };
  }, [mq]);

  return isMatch;
};
