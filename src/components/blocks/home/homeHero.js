import React from "react"
import classNames from "classnames"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Container } from "react-bootstrap"
import { useMediaQuery } from "../../../hooks/use-media-query"

export default function HomeHero( props ) {
  const { heroData } = props // Extract the heroData from props  
  const isMobile = useMediaQuery("(max-width: 992px)")
  const alignment = heroData.captionAlign ?? "left";

  let containerClasses = classNames(
    { [classNames("position-absolute", "top-50", "start-50", "translate-middle", "container")]: !isMobile },
    "mb-md-5",
    "top-0",
    "h-100",
    "w-100",
    "p-0",
  )

  let captionContainerClasses = classNames(
    { [classNames("w-50", "bg-opacity-75", "position-absolute", "my-5")]: !isMobile },
    { [classNames("w-100", "bg-opacity-100")]: isMobile },
    { [classNames("bottom-0", "start-0")]: alignment === "left" && !isMobile },
    { [classNames("bottom-0", "end-0")]: alignment === "right" && !isMobile },
    { [classNames("bottom-0", "start-50", "translate-middle-x")]: alignment === "center" && !isMobile },
    { [classNames("bottom-0", "start-50", "translate-middle-x", "w-100")]: alignment === "full" && !isMobile },
    "bg-black",
    "text-white",
    "p-md-5",
    "p-4",
    "spotlight-hero-caption-container"
  )

  let captionClasses = classNames("d-flex", "flex-column", "gap-4", "p-0", "spotlight-hero-caption")
  let headingClasses = classNames("h3")
  let linkClasses = classNames("btn", "btn-warning", "w-fit", "p-3", "fs-6", "me-auto")

  return (
    <div id="rotator" className="mb-md-5 position-relative spotlight-hero">
      <GatsbyImage image={getImage(heroData.imageSrc)} alt={heroData.imageAlt} className="w-100" />
      <div className={containerClasses}>
        <div className={captionContainerClasses}>
          <Container className={captionClasses}>
            <h2 className={headingClasses}>{heroData.title}</h2>
            <span>{heroData.captionText}</span>
            <a href={heroData.url} className={linkClasses}>
              {heroData.buttonText ? heroData.buttonText : "Learn More"}
            </a>
          </Container>
        </div>
      </div>
    </div>
  )
}
