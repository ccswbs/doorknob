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
import HomeStudyHere from "../components/blocks/home/homeStudyHere"
import HomeOurCampuses from "../components/blocks/home/homeOurCampuses"
import { useSpotlightData } from "../hooks/drupal/use-spotlight-data"
import BERelatedLinks from "../components/beRelatedLinks"
import { useHeroData } from "../hooks/yaml/use-hero-data"

export default function IndexTemplate({ data, children }) {
  const spotlightData = useSpotlightData();
  const heroData = useHeroData();

  const renderHero = spotlightData && spotlightData.hero?.length > 0 ? (
    <HomeHero heroData={spotlightData.hero[0]} />
  ) : (
    <HomeHero heroData={heroData[0]} />
  );


  return (
    <>
      <BECookieBar />
      <AppArmorAlert id="163" />
      <Seo title="University of Guelph - Improve Life" description="Discover excellence at the University of Guelph - a leading institution fostering innovation, world-class research, and personalized learning. Explore our diverse academic programs, cutting-edge facilities, and vibrant campus life. Join a community dedicated to shaping the future." />
      <h1 className="visually-hidden">University of Guelph, Ontario, Canada</h1>
      {renderHero}
      <HomeTagline />
      <HomeCardsSpotlight />
      <HomeStudyHere />
      <HomeStats />
      <HomeOurCampuses />
      <HomeStory />
      <BERelatedLinks />
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
