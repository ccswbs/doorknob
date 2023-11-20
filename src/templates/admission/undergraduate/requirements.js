import React from "react"
import { graphql } from "gatsby"
import { Container } from "react-bootstrap"

export default function UndergraduateRequirements({ data, children, pageContext }) {
  const main = data.main.nodes[0]
  const parents = data.parents.nodes

  // TODO: Combine title from all parents and main
  const title = `Admission Requirements for ${main.title}`

  return (
    <Container className="mt-4">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: main.content }} />

      {parents
        .map(parent => {
          if (parent.content) {
            return <div key={parent.slug} dangerouslySetInnerHTML={{ __html: parent.content }} />
          }
        })
        .filter(Boolean)}
    </Container>
  )
}

export const query = graphql`
  query ($slug: String!, $parentSlugs: [String!]!) {
    main: allRequirementsYaml(filter: { slug: { eq: $slug } }) {
      nodes {
        slug
        title
        content
      }
    }
    parents: allRequirementsYaml(filter: { slug: { in: $parentSlugs } }, sort: { slug: DESC }) {
      nodes {
        slug
        title
        content
      }
    }
  }
`
