import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import { Button, Col, Container, Row } from "react-bootstrap"

import Seo from "../components/seo"
import HomeCardsPrimary from "../components/blocks/home/homeCardsPrimary"
import HomeCardsSecondary from "../components/blocks/home/homeCardsSecondary"
import HomeCardsSpotlight from "../components/blocks/home/homeCardsSpotlight"
import HomeEvents from "../components/blocks/home/homeEvents"
import HomeHero from "../components/blocks/home/homeHero"
import HomeLinks from "../components/blocks/home/homeLinks"
import HomeNews from "../components/blocks/home/homeNews"
import HomeOverlay from "../components/blocks/home/homeOverlay"
import HomeStats from "../components/blocks/home/homeStats"
import HomeStory from "../components/blocks/home/homeStory"

// Provide common components here
const shortcodes = { Button, Container, Link }

export default function IndexTemplate({ data, children }) {
  return (
    <>
      <Seo title={data.mdx.frontmatter.title} />

      <Container fluid>
        <h1 className="visually-hidden">University of Guelph homepage</h1>
        <HomeHero />
        <HomeCardsSpotlight />
        <Container className="content-block mb-4 mt-4">
          <Row>
            <Col>
              <MDXProvider components={shortcodes}>{children}</MDXProvider>
            </Col>
          </Row>
        </Container>

        <HomeCardsPrimary />
        <HomeOverlay />
        <HomeStats />
        <HomeCardsSecondary />

        <Container className="content-block">
          <Row>
            <Col>
              <HomeNews />
            </Col>
            <Col>
              <HomeEvents />
            </Col>
          </Row>
        </Container>

        <HomeStory />

        <HomeLinks />
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
