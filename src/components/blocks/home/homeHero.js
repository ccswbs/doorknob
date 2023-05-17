import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Row } from "react-bootstrap"

const render = ({ image }) => {
  return (
    <Row id="rotator" className="mb-md-5 position-relative">
        <GatsbyImage image={getImage(image.src)} alt={image.alt} />
        <div className="d-flex p-0 position-absolute h-100 top-50 start-50 translate-middle" style={{ maxWidth:"1320px" }}>
            <div className="align-self-center bg-dark bg-opacity-75 w-100 p-4 p-lg-5 mb-lg-5 mt-auto text-center text-white">
                <h2 className="h3 text-white">Bottom Center</h2>
                <p>Horizontally centered on the baseline with space underneath on large displays</p>
            </div>
        </div>
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