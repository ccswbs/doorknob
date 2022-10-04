import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { Container } from "react-bootstrap"
import Seo from '../components/seo'

const shortcodes = { Link } // Provide common components here

export default function PageTemplate ({ data, children }) {
  return (
    <>
      <Seo title={data.mdx.frontmatter.title} />
      <div id="main-column">
        <Container>
          <MDXProvider components={shortcodes}>
            {children}
          </MDXProvider>              
        </Container>
      </div>
    </>
  )
}

export const query = graphql`
  query ($slug: String) {
    mdx (frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        title
      }
    }
  }
`