import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <p>Homepage content</p>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage


// export const query = graphql`
//   query {
//     programs: allNodeProgram(sort: {fields: [title], order: ASC}) {
//       edges {
//         node {
//           drupal_id
//           drupal_internal__nid
//           title
//           path {
//             alias
//           }
//           status
//         }
//       }
//     }
//   }
// `
