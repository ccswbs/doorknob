import React from "react"
import { graphql } from "gatsby"
import AppArmorAlert from "../components/appArmorAlert"
import BECookieBar from "../components/beCookieBar"
import Seo from "../components/seo"
import HomeCardsSpotlight from "../components/blocks/home/homeCardsSpotlight"
import HomeHero from "../components/blocks/home/homeHero"
import HomeTagline from "../components/blocks/home/homeTagline"
import HomeStats from "../components/blocks/home/homeStats"
import HomeStory from "../components/blocks/home/homeStory"
//import { useSpotlightData } from "../hooks/drupal/use-spotlight-data"
import { useHeroData } from "../hooks/yaml/use-hero-data"

export default function IndexTemplate({ data, children }) {
  //const spotlightData = useSpotlightData();
  const heroData = useHeroData();
  return (
    <>
      <BECookieBar />
      <AppArmorAlert />
      <Seo title={data.mdx.frontmatter.title} />
      <h1 className="visually-hidden">University of Guelph homepage</h1>
      {/* spotlightData.hero?.length > 0 && <HomeHero heroData={spotlightData.hero[0]} /> */}
      {heroData.length > 0 && <HomeHero heroData={heroData} />}
      <HomeTagline />
      <HomeCardsSpotlight />
      <HomeStats />
      <HomeStory />
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
