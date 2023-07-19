import React from "react"
import { graphql } from "gatsby"
import { Container, Row } from "react-bootstrap"

import AppArmorAlert from "../components/appArmorAlert"
import Seo from "../components/seo"
import HomeCardsSpotlight from "../components/blocks/home/homeCardsSpotlight"
import HomeEvents from "../components/blocks/home/homeEvents"
import HomeHero from "../components/blocks/home/homeHero"
import HomeLinksPrimary from "../components/blocks/home/homeLinksPrimary"
import HomeNews from "../components/blocks/home/homeNews"
import HomeOverlay from "../components/blocks/home/homeOverlay"
import HomeStats from "../components/blocks/home/homeStats"
import HomeStory from "../components/blocks/home/homeStory"

export default function IndexTemplate({ data, children }) {
  return (
    <>
      <AppArmorAlert />
      <Seo title={data.mdx.frontmatter.title} />

      <Container fluid>
        <h1 className="visually-hidden">University of Guelph homepage</h1>
        {data.allNodeSpotlight?.edges?.length > 0 && <HomeHero heroData={data.allNodeSpotlight.edges[0]} />}

        <HomeLinksPrimary />
        <HomeCardsSpotlight />
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
    allNodeSpotlight(filter: { field_spotlight_rank: { eq: 1 } }) {
      edges {
        node {
          field_spotlight_rank
          field_spotlight_url {
            uri
            url
            title
          }
          relationships {
            field_hero_image {
              field_media_image {
                alt
              }
              relationships {
                field_media_image {
                  gatsbyImage(width: 1920)
                }
              }
            }
          }
          drupal_id
        }
      }
    }
  }
`
