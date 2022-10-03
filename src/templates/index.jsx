import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Seo from '../components/seo'
import PageContainer from '../components/shared/pageContainer'
import HomeCardsPrimary from "../components/blocks/home/homeCardsPrimary"
import HomeCardsSecondary from "../components/blocks/home/homeCardsSecondary"
// import HomeHero from "../components/blocks/home/homeHero"
// import HomeLinks from "../components/blocks/home/homeLinks"
import HomeStats from "../components/blocks/home/homeStats"
import HomeStory from "../components/blocks/home/homeStory"

const shortcodes = { Link, HomeCardsPrimary, HomeCardsSecondary, HomeStats, HomeStory, PageContainer } // Provide common components here

export default function IndexTemplate ({ data, children }) {
  return (
    <>
        <Seo title={data.mdx.frontmatter.title} />
        {/* <HomeHero /> */}
        <div id="main-column">   
          <MDXProvider components={shortcodes}>
            {children}
          </MDXProvider>
          {/* <HomeNews /> */}
          {/* <HomeEvents /> */}
          {/* <HomeLinks /> */}
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