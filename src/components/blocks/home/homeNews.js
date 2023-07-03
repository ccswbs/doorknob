import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

// termTaxonomyId 5 = Top Stories
const query = graphql`
  query {
    allWpPost(
      filter: { terms: { nodes: { elemMatch: { termTaxonomyId: { eq: 5 } } } }, status: { eq: "publish" } }
      limit: 3
    ) {
      edges {
        node {
          id
          title
          uri
        }
      }
    }
  }
`

const NewsItem = styled.li`
  min-height: 7rem;
`;

export default function News() {
  const data = useStaticQuery(query)
  const news = data.allWpPost.edges

  return (
    <div className="d-flex flex-column col-md mb-4 mb-md-0">
      <h2 className="text-primary">News</h2>

      {news ? (
        <ul className="d-flex flex-column flex-grow-1 list-unstyled">
          {news.map(article => (
            <NewsItem key={article.node.id} className="py-3">
              <a className="text-decoration-none link-dark h-100 d-block" href={"https://news.uoguelph.ca" + article.node.uri}>
                {article.node.title}
              </a>
            </NewsItem>
          ))}
        </ul>
      ) : (
        <p>No news at this time.</p>
      )}

      <a className="py-2 mt-auto" href="https://news.uoguelph.ca/">
        Latest News
      </a>
    </div>
  )
}
