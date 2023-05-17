import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Row } from "react-bootstrap"

const render = ({ cards }) => {
    
    let image = cards[0].image;
    let title = cards[0].title;
    let url = cards[0].url;
    
  return (
    <Row id="rotator" className="mb-md-5 position-relative">
        <GatsbyImage image={getImage(image.src)} alt={image.alt} />
        <div className="d-flex p-0 position-absolute h-100 top-50 start-50 translate-middle" style={{ maxWidth:"1320px" }}>
            <div className="align-self-center bg-dark bg-opacity-75 w-100 p-4 p-lg-5 mb-lg-5 mt-auto text-center text-white">
                <h2 className="h3"><a href={url} className="text-white">{title}</a></h2>
            </div>
        </div>
    </Row>
   )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_cards_spotlight"}) {
      id
      cards {
        title
        url
        image {
          src {
            childImageSharp {
              gatsbyImageData (
                height: 800
              )
            }
          }
          alt
        }
      }
    }
  }
`

export default function HomeHero () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}