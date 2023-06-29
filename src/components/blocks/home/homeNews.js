import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Card, Container, Row } from "react-bootstrap"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const render = data => {
  let shownNews = data.allWpPost.edges

  return (
    <Container>
      <div className="align-items-center d-flex justify-content-between mb-3">
        <h2 className="text-primary">News</h2>
      </div>

      {shownNews ? (
        <ul className="d-flex flex-column list-unstyled">
          {shownNews.map(wpPost => (
            <li className="py-3">
              <a href={"https://news.uoguelph.ca" + wpPost.node.uri}>
                {wpPost.node.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news at this time.</p>
      )}

      <a className="py-3" href="#">Latest News</a>
    </Container>
  )
}

// termTaxonomyId 5 = Top Stories
const query = graphql`
  query {
    allWpPost(
      filter: {
        terms: { nodes: { elemMatch: { termTaxonomyId: { eq: 5 } } } }
        status: { eq: "publish" }
      }
      limit: 3
    ) {
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

export default function News() {
  return <StaticQuery query={query} render={allWpPost => render(allWpPost)} />
}
