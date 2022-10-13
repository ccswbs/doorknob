import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container } from "react-bootstrap"

const render = ({ cards }) => {
  return (
    <Container className="content-block">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {cards.map(({title, body, image}, index) => {
          return (
            <Col key={index}>
              <Card className="h-100 border-0 bg-info bg-opacity-10">
                <GatsbyImage image={getImage(image.src)} alt={image.alt} className="card-img-top" />
                <Card.Body className="p-5">
                  <Card.Title as="h2" className="mb-4">{title}</Card.Title>
                  <Card.Text>{body}</Card.Text>
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
    blockYaml(yamlId: {eq: "home_cards_primary"}) {
      id
      cards {
        title
        body
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

export default function HomeCardsPrimary () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}
