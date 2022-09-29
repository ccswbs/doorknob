import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Seo from "../components/seo"

const shortcodes = { Link } // Provide common components here

export default function IndexTemplate ({ data, children }) {
  return (
    <>
        <Seo title={data.mdx.frontmatter.title} />
        <MDXProvider components={shortcodes}>
          {children}
        </MDXProvider>
    </>
  )
}

export const query = graphql`
  query {
    mdx (frontmatter: {slug: {eq: "/"}}) {
      frontmatter {
        title
      }
    }
  }
`

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
// export const Head = () => <Seo title={data.mdx.frontmatter.title} />
