import React from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container } from "react-bootstrap"

export default function HomeCardsSpotlight() {
  // Query will sort first by rank, then by recently changed.
  // Rank 1 will be skipped since it's for the Hero image
  // Only a maxiumum of 4 published nodes will be returned
  const data = useStaticQuery(graphql`
    query {
      allNodeSpotlight(
        sort: [{ field_spotlight_rank: ASC }, { changed: DESC }]
        filter: { status: { eq: true }, field_spotlight_rank: { ne: 1 } }
        limit: 4
      ) {
        edges {
          node {
            drupal_id
            field_spotlight_rank
            field_spotlight_url {
              uri
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
                    gatsbyImage(width: 400, aspectRatio: 1.5, cropFocus: ENTROPY)
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const spotlightCards = data.allNodeSpotlight.edges.length
  const rowClasses = classNames("row", "row-cols-1", "g-4", {
    "row-cols-md-2": spotlightCards === 2,
    "row-cols-md-3": spotlightCards === 3,
    "row-cols-md-2 row-cols-xl-4": spotlightCards === 4,
  })
  let spotlightLink

  return (
    spotlightCards > 1 && (
      <Container className="content-block">
        <h2 className="mt-5 mb-5 text-primary">Spotlight</h2>
        <div className={rowClasses}>
          {data.allNodeSpotlight.edges.map(item => {
            // Check if Spotlight URL is external or internal
            if (item.node.field_spotlight_url?.url === item.node.field_spotlight_url?.uri) {
              spotlightLink = item.node.field_spotlight_url.url
            } else {
              spotlightLink = "https://www.uoguelph.ca" + item.node.field_spotlight_url.url
            }

            return (
              <Col key={item.node.drupal_id} className="mt-4 mb-4">
                <Card className="h-100 border-0 bg-info bg-opacity-10 spotlight-card">
                  <GatsbyImage
                    image={getImage(
                      item.node.relationships?.field_hero_image?.relationships?.field_media_image.gatsbyImage,
                    )}
                    alt={item.node.relationships?.field_hero_image?.field_media_image.alt}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title
                      as="a"
                      href={spotlightLink}
                      className="mb-4 h5 spotlight link-dark stretched-link text-decoration-none fw-normal"
                    >
                      {item.node.field_spotlight_url?.title}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </div>
      </Container>
    )
  )
}
