import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col } from "react-bootstrap"
import PageContainer from "../../shared/pageContainer"

const render = ({ cards }) => {
  return (
    <PageContainer.SiteContent>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {cards.map(({title, body, image}, index) => {
          return (
            <Col key={index}>
              <Card className="h-100 border-0 bg-info bg-opacity-10">
                <GatsbyImage image={getImage(image.src)} alt={image.alt} className="card-img-top" />
                <Card.Body>
                  <Card.Title as="h3">{title}</Card.Title>
                  <Card.Text>{body}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
        )})}
      </div>
    </PageContainer.SiteContent>
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
