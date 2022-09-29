import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Seo from "src/components/seo"
import PageContainer from 'components/shared/pageContainer'
import HomeStats from "components/blocks/home/homeStats"
import HomeCards from "components/blocks/home/homeCards"

const shortcodes = { Link } // Provide common components here

export default function IndexTemplate ({ data, children }) {
  return (
    <>
        <Seo title={data.mdx.frontmatter.title} />
        {/* <HomeHero /> */}
        <div id="main-column">
          <PageContainer.SiteContent>
            <PageContainer.ContentArea>
              
              <MDXProvider components={shortcodes}>
                {children}
              </MDXProvider>
              
              <HomeCards />

            </PageContainer.ContentArea>
          </PageContainer.SiteContent>
        </div>
        
        <HomeStats />
        {/* <HomeStory /> */}
        {/* <HomeNews /> */}
        {/* <HomeEvents /> */}
        {/* <HomeLinks /> */}
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