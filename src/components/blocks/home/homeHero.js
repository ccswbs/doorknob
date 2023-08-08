import React from "react"
import classNames from "classnames"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Container, Row } from "react-bootstrap"
import { graphql, useStaticQuery } from "gatsby"
import { useMediaQuery } from "../../../hooks/use-media-query"

const query = graphql`
  query {
    blockYaml(yamlId: { eq: "home_hero" }) {
      title
      body
      alignment
      link {
        url
        text
      }
      image {
        src {
          childImageSharp {
            gatsbyImageData(width: 1680, height: 640)
          }
        }
        alt
      }
    }
  }
`

export default function HomeHero() {
  const data = useStaticQuery(query).blockYaml
  const isMobile = useMediaQuery("(max-width: 992px)")
  const alignment = data.alignment;

  let containerClasses = classNames(
    { [classNames("position-absolute", "top-50", "start-50", "translate-middle", "container")]: !isMobile },
    "mb-md-5",
    "top-0",
    "h-100",
    "w-100",
    "p-0",
  )

  let captionContainerClasses = classNames(
    { [classNames("w-50", "bg-opacity-75", "position-absolute", "my-4")]: !isMobile },
    { [classNames("w-100", "bg-opacity-100")]: isMobile },
    { [classNames("top-50", "start-0", "translate-middle-y")]: alignment === "west" && !isMobile },
    { [classNames("top-50", "end-0", "translate-middle-y")]: alignment === "east" && !isMobile },
    { [classNames("bottom-0", "start-50", "translate-middle-x", "w-100")]: alignment === "south" && !isMobile },
    { [classNames("top-0", "start-50", "translate-middle-x", "w-100")]: alignment === "north" && !isMobile },
    { [classNames("top-0", "start-0")]: alignment === "north-west" && !isMobile },
    { [classNames("top-0", "end-0")]: alignment === "north-east" && !isMobile },
    { [classNames("bottom-0", "start-0")]: alignment === "south-west" && !isMobile },
    { [classNames("bottom-0", "end-0")]: alignment === "south-east" && !isMobile },
    { [classNames("top-50", "start-50", "translate-middle", "w-100")]: alignment === "center" && !isMobile },
    "bg-black",
    "text-white",
    "p-md-5",
    "p-4",
    "spotlight-hero-caption-container"
  )

  let captionClasses = classNames("d-flex", "flex-column", "gap-4", "p-0", "spotlight-hero-caption")
  let headingClasses = classNames("h4")
  let bodyClasses = classNames("fs-6")
  let linkClasses = classNames("btn", "btn-warning", "w-fit", "p-3", "fs-6", "me-auto")

  return (
    <div id="rotator" className="mb-md-5 position-relative spotlight-hero">
      <GatsbyImage image={getImage(data.image.src)} alt={data.image.alt} className="w-100" />
      <div className={containerClasses}>
        <div className={captionContainerClasses}>
          <Container className={captionClasses}>
            <h2 className={headingClasses}>{data.title}</h2>
            <span className={bodyClasses}>{data.body}</span>
            <a href={data.link.url} className={linkClasses}>
              {data.link.text}
            </a>
          </Container>
        </div>
      </div>
    </div>
  )
}
