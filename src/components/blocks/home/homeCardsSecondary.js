import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Card, Col, Container, Row } from "react-bootstrap"
import styled from "styled-components"

const borderColourOptions = [
  "var(--bs-red)",
  "var(--bs-yellow)",
  "var(--bs-blue)",
]

const BorderCard = styled(Card.Body)`
  border-left: 1rem solid ${props => (props.border ?? "#000000")};
`;
const Body = styled.span`
  a {
    text-decoration-color: #8ed1ff;
    text-underline-offset: 4px;
  }
`

const render = ({ cards }) => {
  return (
    <Container className="content-block">
      <Row className="row-cols-1 row-cols-md-3 g-4">
        {cards.map(({title, body_html}, index) => {
          return (
            <Col key={index}>
              <Card className="h-100 border-0 bg-info bg-opacity-10">
                <BorderCard border={borderColourOptions[index%borderColourOptions.length]} >
                  <Card.Title as="h2" className="h3">{title}</Card.Title>
                  <Card.Text><Body dangerouslySetInnerHTML={{__html: body_html}}></Body></Card.Text>
                </BorderCard>
              </Card>
            </Col>
        )})}
      </Row>
    </Container>
  )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_cards_secondary"}) {
      id
      cards {
        title
        body_html
      }
    }
  }
`

export default function HomeCardsSecondary () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}
