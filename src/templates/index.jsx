import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { Button, Container } from "react-bootstrap"

import Seo from '../components/seo'
import HomeCardsPrimary from "../components/blocks/home/homeCardsPrimary"
import HomeCardsSecondary from "../components/blocks/home/homeCardsSecondary"
import HomeEvents from "../components/blocks/home/homeEvents"
import HomeHero from "../components/blocks/home/homeHero"
import HomeNews from "../components/blocks/home/homeNews"
import HomeOverlay from "../components/blocks/home/homeOverlay"
import HomeStats from "../components/blocks/home/homeStats"
import HomeStory from "../components/blocks/home/homeStory"

// Provide common components here
const shortcodes = { 
  Button, 
  Container, 
  HomeCardsPrimary, 
  HomeCardsSecondary, 
  HomeEvents, 
  HomeNews,
  HomeOverlay,
  HomeStats, 
  HomeStory,
  Link }

export default function IndexTemplate ({ data, children }) {
  return (
    <>
      <Seo title={data.mdx.frontmatter.title} />
      <Container fluid>
        <HomeHero />
        <MDXProvider components={shortcodes}>
          {children}
        </MDXProvider>
      </Container>
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