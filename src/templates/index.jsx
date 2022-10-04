import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { Button } from "react-bootstrap"

import Seo from '../components/seo'
import PageContainer from '../components/shared/pageContainer'
import HomeCardsPrimary from "../components/blocks/home/homeCardsPrimary"
import HomeCardsSecondary from "../components/blocks/home/homeCardsSecondary"
import HomeHero from "../components/blocks/home/homeHero"
import HomeStats from "../components/blocks/home/homeStats"
import HomeStory from "../components/blocks/home/homeStory"

const shortcodes = { Button, Link, HomeCardsPrimary, HomeCardsSecondary, HomeStats, HomeStory, PageContainer } // Provide common components here

export default function IndexTemplate ({ data, children }) {
  console.log(data)
  return (
    <>
        <Seo title={data.mdx.frontmatter.title} />
        <div id="main-column">
          <HomeHero />
          <MDXProvider components={shortcodes}>
            {children}
          </MDXProvider>
          {/* <HomeNews /> */}
          {/* <HomeEvents /> */}
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