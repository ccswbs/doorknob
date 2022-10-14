import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Card, Container, Row } from "react-bootstrap"
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const NewsLink = styled.a`
  color: #000000;
  text-decoration-color: #8ed1ff;
  text-underline-offset: 4px;
`

const render = ( data ) => {
  let shownNews = data.allWpPost.edges;

  return (
    <Container className="content-block">
      <div className="align-items-center d-flex justify-content-between mb-3">
        <h2 className="text-primary">News</h2>
        <a className="btn-info btn btn-sm px-3" href="https://news.uoguelph.ca/category/feature/">All News <i className="fa-solid fa-chevron-right" aria-hidden="true" /></a>
      </div>

      {shownNews ? 
      <div className="gy-0">
        <Row as="ul" className="row-cols-1 row-cols-md-3 g-5 p-0">
          {shownNews.map ( wpPost => {
            let newsLink = "https://news.uoguelph.ca" + wpPost.node.uri;
            return (
              <Card as="li" key={wpPost.node.id} className="border-0">
                <GatsbyImage image={getImage(wpPost.node.featuredImage.node.localFile)} alt={wpPost.node.featuredImage.node.altText} />
                <Card.Body className="px-0">
                  <Card.Title as="p">
                    <NewsLink className="fs-5" href={newsLink}>{wpPost.node.title}</NewsLink>
                  </Card.Title>
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