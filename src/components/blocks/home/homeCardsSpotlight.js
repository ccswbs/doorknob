import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container } from "react-bootstrap"

const render = ({ cards }) => {
  return (
    <Container className="content-block">
      <h2 className="mb-4 mt-4">Spotlight</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cards.map(({title, url, image}, index) => {
            
          if (index === 0) {
            return null; // Skip the first result
          }
            
          return (
            <Col key={index}>
              <Card className="h-100 border-0 bg-info bg-opacity-10">
                <GatsbyImage image={getImage(image.src)} alt={image.alt} className="card-img-top" />
                <Card.Body className="p-4">
                  <Card.Title as="h3" className="mb-4 h5"><a href={url} className="stretched-link">{title}</a></Card.Title>
                </Card.Body>
              </Card>
            </Col>
        )})}
      </div>
    </Container>
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
                width: 400
              )
            }
          }
          alt
        }
      }
    }
  }
`

export default function HomeCardsSpotlight () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}
