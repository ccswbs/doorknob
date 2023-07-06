import React from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container } from "react-bootstrap"

export default function HomeCardsSpotlight () {
    
    const data = useStaticQuery(graphql`
      query {
        blockYaml(yamlId: {eq: "home_cards_spotlight"}) {
          id
          heading
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
    const spotlightCards = data.blockYaml.cards.length;
    const rowClasses = classNames("row","row-cols-1","g-4",{"row-cols-md-2": spotlightCards === 3, "row-cols-md-3": spotlightCards > 3});
    
    return (spotlightCards > 2 &&
        <Container>
          <h2 className="text-primary mt-5 mb-5">{data.blockYaml.heading}</h2>
          <div className={rowClasses}>
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
                        <a href={url} className="spotlight link-dark stretched-link text-decoration-none">{title}</a>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
            )})}
          </div>
        </Container>
    )
}