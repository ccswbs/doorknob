import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { useWindowSize } from "../../../hooks/use-window-size"
import classNames from "classnames"

const query = graphql`
  query {
    blockYaml(yamlId: { eq: "home_study_here" }) {
      links {
        title
        url
        image {
          alt
          caption
          src {
            childImageSharp {
              gatsbyImageData(width: 1320)
            }
          }
        }
      }
    }
  }
`

export default function HomeStudyHere() {
  const links = useStaticQuery(query).blockYaml.links
  const [activeLink, setActiveLink] = useState(links[0])
  const windowSize = useWindowSize();
  const isDesktop = windowSize.width >= 992;

  const imageClasses = classNames("position-absolute", "w-100", "h-100", "mh-100", "z-n1", "study-here-image")
  const captionClasses = classNames(
    "position-absolute",
    "bottom-0",
    "start-0",
    "text-white",
    "p-4",
    "study-here-caption fs-6",
    "w-66"
  )

  const linkContainerClasses = classNames(
    { [classNames("ms-auto", "w-33")]: isDesktop },
    { [classNames("w-100")]: !isDesktop },
    "d-flex",
    "flex-column",
    "gap-2",
    "z-10",
  )

  const linkClasses = classNames(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "p-5",
    "bg-black",
    "bg-opacity-75",
    "text-decoration-none",
    "text-white",
    "gap-3",
    "study-here-link",
  )

  return (
    <Container className="content-block position-relative">
      <h2 className="mt-5 mb-5">Study Here</h2>

      <div className="position-relative study-here-container">
        {isDesktop && (
          <>
            {links.map(link => {
              return (
                <GatsbyImage
                  key={link.url}
                  image={getImage(link.image.src)}
                  alt={link.image.alt}
                  className={classNames(imageClasses, { [classNames("hidden")]: link !== activeLink })}
                />
              )
            })}
            <span className={captionClasses}>{activeLink.image.caption}</span>
          </>
        )}

        <div className={linkContainerClasses}>
          {links.map(link => {
            return (
              <a href={link.url} className={linkClasses} key={link.url} onMouseEnter={() => setActiveLink(link)}>
                <h3 className="mb-0 h5">{link.title}</h3>
                <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
              </a>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
