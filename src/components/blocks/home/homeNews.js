import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Card, Container, Row } from "react-bootstrap"

const render = ( data ) => {
  let shownNews = data.allWpPost.edges;
  return (
    <Container>
      <h2 className="mb-5">News</h2>
      {shownNews ? 
      <div className="gy-0">
        <Row as="ul" className="row-cols-1 row-cols-md-3 g-4">
          {shownNews.map ( wpPost => {
            let newsLink = "https://news.uoguelph.ca" + wpPost.node.uri;
            return (
              <Card as="li" key={wpPost.node.id}>
                <Card.Body>
                  <Card.Title><a href={newsLink}>{wpPost.node.title}</a></Card.Title>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </div>
  
      : <p>No news at this time.</p>}
    </Container>
  )
}

const query = graphql`
  query {
    allWpPost(filter: {terms: {nodes: {elemMatch: {termTaxonomyId: {eq: 5}}}}, status: {eq: "publish"}}, limit: 3) {
      edges {
        node {
          id
          title
          date
          uri
        }
      }
    }
  }
`

export default function News () {
  return <StaticQuery query={query} render={allWpPost => render (allWpPost)} />
}