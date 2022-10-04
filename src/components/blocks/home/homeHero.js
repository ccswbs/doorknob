import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Row } from "react-bootstrap"

const render = ({ image }) => {
  return (
    <Row id="rotator">
      <GatsbyImage image={getImage(image.src)} alt={image.alt} />
    </Row>
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