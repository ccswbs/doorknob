import React from "react"
import classNames from "classnames"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Container } from "react-bootstrap"
import { useMediaQuery } from "../../../hooks/use-media-query"

export default function HomeHero(props) {
  const { heroData } = props // Extract the heroData from props
  const isDesktop = useMediaQuery("(min-width: 992px)")
  const alignment = heroData.captionAlign ?? "left";
  const imageAlignment = heroData.imageAlignment ?? "center";

  let containerClasses = classNames(
    { [classNames("position-absolute", "top-50", "start-50", "translate-middle", "container")]: isDesktop },
    "mb-md-5",
    "top-0",
    "h-100",
    "w-100",
    "p-0",
  )

  let captionContainerClasses = classNames(
    { [classNames("w-50", "bg-opacity-75", "position-absolute", "my-5")]: isDesktop },
    { [classNames("w-100", "bg-opacity-100")]: !isDesktop },
    { [classNames("bottom-0", "start-0")]: alignment === "left" && isDesktop },
    { [classNames("bottom-0", "end-0")]: alignment === "right" && isDesktop },
    { [classNames("bottom-0", "start-50", "translate-middle-x")]: alignment === "center" && isDesktop },
    { [classNames("bottom-0", "start-50", "translate-middle-x", "w-100")]: alignment === "full" && isDesktop },
    "bg-black",
    "text-white",
    "p-md-5",
    "p-4",
    "spotlight-hero-caption-container",
  )

  let mainContainerClasses = classNames(
    "position-relative",
    "mb-md-5",
    "spotlight-hero",
    { "left-align-image": imageAlignment === "left" },
    { "right-align-image": imageAlignment === "right" },
  )
  let captionClasses = classNames("d-flex", "flex-column", "gap-4", "p-0", "spotlight-hero-caption")
  let headingClasses = classNames("h3")
  let linkClasses = classNames("btn", "btn-warning", "w-fit", "p-3", "fs-6", "me-auto")

  return (
    <div id="rotator" className={mainContainerClasses}>
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
