import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container } from "react-bootstrap"

export default function HomeCardsSpotlight () {
    
    const data = useStaticQuery(graphql`
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
    `)
    
    return (
        <Container>
          <h2 className="mt-5 mb-5">Spotlight</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {data.blockYaml.cards.map(({title, url, image}, index) => {
                
              if (index === 0) {
                return null; // Skip the first result
              }
                
              return (
                <Col key={index} className="mt-4 mb-4">
                  <Card className="h-100 border-0 bg-info bg-opacity-10">
                    <GatsbyImage image={getImage(image.src)} alt={image.alt} className="card-img-top" />
                    <Card.Body className="p-4">
                      <Card.Title as="h3" className="mb-4 h5">
                        <a href={url} className="link-dark stretched-link text-decoration-none">{title}</a>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
            )})}
          </div>
        </Container>
    )
}