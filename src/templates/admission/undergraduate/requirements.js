import React from "react"
import { graphql } from "gatsby"
import { Container } from "react-bootstrap"

export default function UndergraduateRequirements({ data, children, pageContext }) {
  const main = data.main.nodes[0]
  const parents = data.parents.nodes

  // TODO: Combine title from all parents and main
  const title = `Admission Requirements for ${main.title} Students`

  return (
    <Container className="mt-4">
      <h1>{title}</h1>
      <div className="my-5" dangerouslySetInnerHTML={{ __html: main.html?.internal?.content }} />

      {parents
        .map(parent => {
          if (parent.html) {
            return (
              <div
                className="my-5"
                key={parent.slug}
                dangerouslySetInnerHTML={{ __html: parent.html.internal.content }}
              />
            )
          }
        })
        .filter(Boolean)}
    </Container>
  )
}

export const query = graphql`
  query ($slug: String!, $parents: [String!]!) {
    main: allRequirementsYaml(filter: { slug: { eq: $slug } }) {
      nodes {
        slug
        title
        html {
          internal {
            content
          }
        }
      }
    }
    parents: allRequirementsYaml(filter: { slug: { in: $parents } }, sort: { slug: DESC }) {
      nodes {
        slug
        title
        html {
          internal {
            content
          }
        }
      }
    }
  }
`
