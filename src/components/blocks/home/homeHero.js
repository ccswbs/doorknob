import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const render = ({ image }) => {
  return (
    <div id="rotator" className="d-flex justify-content-center mb-5">
        <GatsbyImage image={getImage(image.src)} alt={image.alt} />
    </div>
  )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_hero"}) {
        id
        image {
          src {
            childImageSharp {
              gatsbyImageData (
                width: 1920
              )
            }
          }
          alt
        }
    }
  }
`

export default function HomeHero () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}