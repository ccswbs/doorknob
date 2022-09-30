import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Seo from '../components/seo'
import PageContainer from '../components/shared/pageContainer'
import HomeCards from "../components/blocks/home/homeCards"
// import HomeHero from "../components/blocks/home/homeHero"
// import HomeLinks from "../components/blocks/home/homeLinks"
import HomeStats from "../components/blocks/home/homeStats"
// import HomeStory from "../components/blocks/home/homeStory"

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
          <HomeStats />
          {/* <HomeStory /> */}
          {/* <HomeNews /> */}
          {/* <HomeEvents /> */}
          {/* <HomeLinks /> */}
        </div>
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