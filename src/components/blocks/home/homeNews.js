import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Card, Container, Row } from "react-bootstrap"
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const render = ( data ) => {
  let shownNews = data.allWpPost.edges;
  return (
    <Container>
      <h2 className="mb-5">News</h2>
      <a href="https://news.uoguelph.ca/category/feature/">All News</a>
      {shownNews ? 
      <div className="gy-0">
        <Row as="ul" className="row-cols-1 row-cols-md-3 g-4">
          {shownNews.map ( wpPost => {
            let newsLink = "https://news.uoguelph.ca" + wpPost.node.uri;
            return (
              <Card as="li" key={wpPost.node.id}>
                <Card.Body>
                  <GatsbyImage image={getImage(wpPost.node.featuredImage.node.localFile)} alt={wpPost.node.featuredImage.node.altText} />
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

// termTaxonomyId 5 = Top Stories
const query = graphql`
  query {
    allWpPost(filter: {terms: {nodes: {elemMatch: {termTaxonomyId: {eq: 5}}}}, status: {eq: "publish"}}, limit: 3) {
      edges {
        node {
          id
          title
          date
          uri
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
              altText
            }
          }
        }
      }
    }
  }
`

export default function News () {
  return <StaticQuery query={query} render={allWpPost => render (allWpPost)} />
}