import React from "react"
import classNames from "classnames"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container } from "react-bootstrap"
import { useSpotlightData } from "../../../hooks/drupal/use-spotlight-data"

export default function HomeCardsSpotlight() {
  const spotlightData = useSpotlightData()
  const cardData = spotlightData.cards
  const quantity = cardData.length
  const imageAlignment = spotlightData?.imageAlignment ?? "center" // 3 options: left, center, right
  const rowClasses = classNames(
    "row",
    "row-cols-1",
    "g-4", // xs, sm: stack vertically,
    {
      "row-cols-md-2": quantity === 2,
      "row-cols-md-3": quantity === 3, // md, lg: show 2 or 3 per row
      "row-cols-md-2 row-cols-xl-4": quantity === 4,
    }, // xl: allow 4 on a single row
  )

  const cardClasses = classNames(
    "h-100",
    "border-0",
    "bg-info",
    "bg-opacity-10",
    "spotlight-card",
    { "left-align-image": imageAlignment === "left" },
    { "right-align-image": imageAlignment === "right" },
  )

  return (
    quantity > 1 && (
      <Container className="content-block">
        <h2 className="mt-5 mb-5">Our Latest News and Events</h2>
        <div className={rowClasses}>
          {cardData.map(item => {
            return (
              <Col key={item.key} className="mt-4 mb-4">
                <Card className={cardClasses}>
                  <GatsbyImage image={getImage(item.imageSrc)} alt={item.imageAlt} className="card-img-top" />
                  <Card.Body>
                    <Card.Title
                      as="a"
                      href={item.url}
                      className="mb-4 h5 spotlight link-dark stretched-link text-decoration-none fw-normal"
                    >
                      {item.title}
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
