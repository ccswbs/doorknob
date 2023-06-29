import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"

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
        }
      }
    }
  }
`

export default function News() {
  const data = useStaticQuery(query);
  const shownNews = data.allWpPost.edges;

  return (
    <Container>
      <div className="align-items-center d-flex justify-content-between mb-3">
        <h2 className="text-primary">News</h2>
      </div>

      {shownNews ? (
        <ul className="d-flex flex-column list-unstyled">
          {shownNews.map(wpPost => (
            <li className="py-2">
              <a className="text-decoration-none link-dark" href={"https://news.uoguelph.ca" + wpPost.node.uri}>
                {wpPost.node.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news at this time.</p>
      )}

      <a className="py-2" href="https://news.uoguelph.ca/">
        Latest News
      </a>
    </Container>
  )
}
