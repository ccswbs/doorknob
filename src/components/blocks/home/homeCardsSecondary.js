import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Card, Col } from "react-bootstrap"
import PageContainer from "../../shared/pageContainer"
import styled from "styled-components"

const borderColourOptions = [
  "var(--bs-red)",
  "var(--bs-yellow)",
  "var(--bs-blue)",
]

const BorderCard = styled(Card.Body)`
  border-left: 1rem solid ${props => (props.border ?? "#000000")};
`;

const render = ({ cards }) => {
  return (
    <PageContainer.SiteContent>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cards.map(({title, body}, index) => {
          return (
            <Col key={index}>
              <Card className="h-100 border-0 bg-info bg-opacity-10">
                <BorderCard border={borderColourOptions[index%borderColourOptions.length]} >
                  <Card.Title as="h3">{title}</Card.Title>
                  <Card.Text>{body}</Card.Text>
                </BorderCard>
              </Card>
            </Col>
        )})}
      </div>
    </PageContainer.SiteContent>
  )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_cards_secondary"}) {
      id
      cards {
        title
        body
      }
    }
  }
`

export default function HomeCardsSecondary () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}
