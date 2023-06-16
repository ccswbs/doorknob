import React from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container } from "react-bootstrap"

export default function HomeCardsSpotlight () {
    
    const data = useStaticQuery(graphql`
      query {
        allNodeSpotlight(sort: {field_spotlight_rank: ASC}) {
          edges {
            node {
              drupal_id
              field_spotlight_rank
              field_spotlight_url {
                url
                title
              }
              relationships {
                field_hero_image {
                  field_media_image {
                    alt
                  }
                  relationships {
                    field_media_image {
                      gatsbyImage(width: 400)
                    }
                  }
                }
              }
            }
          }
        }
      }
    `)
    const spotlightCards = data.allNodeSpotlight.edges.length;
    const rowClasses = classNames("row","row-cols-1","g-4",{"row-cols-md-2": spotlightCards === 3, "row-cols-md-3": spotlightCards > 3});
    
    return (spotlightCards > 2 &&
        <Container>
          <h2 className="mt-5 mb-5">Spotlight</h2>
          <div className={rowClasses}>
            {data.allNodeSpotlight.edges.map(item => {
                
              if (item.field_spotlight_rank === 1) {
                return null; // Skip the first result
              }
                
              return (
                <Col key={item.drupal_id} className="mt-4 mb-4">
                  <Card className="h-100 border-0 bg-info bg-opacity-10">
                    <GatsbyImage image={getImage(item.relationships?.field_hero_image?.relationships?.field_media_image.gatsbyImage)} alt={item.relationships?.field_hero_image?.field_media_image.alt} className="card-img-top" />
                    <Card.Body className="p-4">
                      <Card.Title as="h3" className="mb-4 h5">
                        <a href={item.field_spotlight_url?.url} className="spotlight link-dark stretched-link text-decoration-none">{item.field_spotlight_url?.title}</a>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
            )})}
          </div>
        </Container>
    )
}