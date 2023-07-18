import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { Button, Col, Container, Row } from "react-bootstrap"

import AppArmorAlert from "../components/appArmorAlert"
import BECookieBar from "../components/beCookieBar"
import Seo from "../components/seo"
import HomeCardsSpotlight from "../components/blocks/home/homeCardsSpotlight"
import HomeEvents from "../components/blocks/home/homeEvents"
import HomeHero from "../components/blocks/home/homeHero"
import HomeLinksPrimary from "../components/blocks/home/homeLinksPrimary"
import HomeNews from "../components/blocks/home/homeNews"
import HomeOverlay from "../components/blocks/home/homeOverlay"
import HomeStats from "../components/blocks/home/homeStats"
import HomeStory from "../components/blocks/home/homeStory"

// Provide common components here
const shortcodes = { Button, Container, Link }

export default function IndexTemplate({ data, children }) {
  return (
    <>
      <BECookieBar />
      <AppArmorAlert />
      <Seo title={data.mdx.frontmatter.title} />

      <Container fluid>
        <h1 className="visually-hidden">University of Guelph homepage</h1>
        <HomeHero />
        <HomeCardsSpotlight />

        <HomeLinksPrimary />
        <HomeOverlay />
        <HomeStats />

        <Container className="content-block">
          <Row>
            <HomeNews />
            <HomeEvents />
          </Row>
        </Container>

        <HomeStory />
      </Container>
    </>
  )
}

export const query = graphql`
  query ($slug: String) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`
