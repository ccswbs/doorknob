import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Row } from "react-bootstrap"

export default function HomeHero(props) {
  const { heroData } = props // Extract the heroData from props

  const defaultClasses = classNames("d-flex", "p-0", "h-100")
  const desktopClasses = classNames("position-absolute", "top-50", "start-50", "translate-middle")
  const [isMobile, setIsMobile] = useState(false)

  let captionClasses = classNames(defaultClasses, { [desktopClasses]: !isMobile }, "spotlight-hero")
  let linkContainerClasses = classNames("align-self-center", "w-100", {"p-4": !isMobile}, "text-center", "text-white")

  let headingClasses = classNames(
    { [classNames("w-50", "bg-opacity-75")]: !isMobile, [classNames("w-100", "bg-opacity-100")]: isMobile },
    "p-5",
    "h3",
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024) // Adjust the breakpoint as per your needs
    }

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize)

    // Call handleResize initially
    handleResize()

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Row id="rotator" className="mb-md-5 position-relative">
      <GatsbyImage image={getImage(heroData.imageSrc)} alt={heroData.imageAlt} />
      <div className={captionClasses} style={{ maxWidth: "1320px" }}>
        <div className={linkContainerClasses}>
          <h2 className={headingClasses}>
            <a href={heroData.url} className="spotlight text-decoration-none text-white stretched-link fw-normal">
              {heroData.title}
            </a>
          </h2>
        </div>
      </div>
    </Row>
  )
}
