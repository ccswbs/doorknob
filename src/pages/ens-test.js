import React from "react";
import AppArmorAlert from "../components/appArmorAlert";
import BECookieBar from "../components/beCookieBar";
import Seo from "../components/seo";
import HomeCardsSpotlight from "../components/blocks/home/homeCardsSpotlight";
import HomeHero from "../components/blocks/home/homeHero";
import HomeTagline from "../components/blocks/home/homeTagline";
import HomeStats from "../components/blocks/home/homeStats";
import HomeStory from "../components/blocks/home/homeStory";
import HomeStudyHere from "../components/blocks/home/homeStudyHere";
import HomeOurCampuses from "../components/blocks/home/homeOurCampuses";
import { useSpotlightData } from "../hooks/drupal/use-spotlight-data";
import BERelatedLinks from "../components/beRelatedLinks";

export default function IndexTemplate({ data, children }) {
  const spotlightData = useSpotlightData();

  return (
    <>
      <BECookieBar />
      <AppArmorAlert id="162" />
      <Seo
        title="University of Guelph - Improve Life"
        description="Discover excellence at the University of Guelph - a leading institution fostering innovation, world-class research, and personalized learning. Explore our diverse academic programs, cutting-edge facilities, and vibrant campus life. Join a community dedicated to shaping the future."
      />
      <h1 className="visually-hidden">University of Guelph, Ontario, Canada</h1>
      <HomeHero heroData={spotlightData.hero[0]} />
      <HomeTagline />
      <HomeCardsSpotlight />
      <HomeStudyHere />
      <HomeStats />
      <HomeOurCampuses />
      <HomeStory />
      <BERelatedLinks />
    </>
  );
}
