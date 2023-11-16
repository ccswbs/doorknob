import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Container } from "react-bootstrap"

const shortcodes = { Link }

export default function UndergraduateRequirements({ data, children, pageContext }) {
  const { slug } = data.mdx.frontmatter



  return (
    <Container className='mt-4'>
      <h1>{slug}</h1>

      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Container>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
      }
    }
  }
`
