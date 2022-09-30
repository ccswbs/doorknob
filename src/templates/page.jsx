import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Seo from '../components/seo'
import PageContainer from '../components/shared/pageContainer'

const shortcodes = { Link } // Provide common components here

export default function PageTemplate ({ data, children }) {
  return (
    <>
        <Seo title={data.mdx.frontmatter.title} />
        <div id="main-column">
          <PageContainer.SiteContent>
            <PageContainer.ContentArea>      
              <MDXProvider components={shortcodes}>
                {children}
              </MDXProvider>              
            </PageContainer.ContentArea>
          </PageContainer.SiteContent>
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