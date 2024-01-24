import { useStaticQuery, graphql } from "gatsby";

// YAML version of Spotlight Data
export const useSpotlightData = () => {
  let spotlightData = {};

  const data = useStaticQuery(graphql`
    query {
      blockYaml(yamlId: { eq: "home_cards_spotlight" }) {
        heading
        cards {
          title
          url
          image {
            src {
              childImageSharp {
                gatsbyImageData(width: 640)
              }
            }
            alt
            alignment
          }
        }
      }
    }
  `);

  const cards = data.blockYaml.cards;
  let cardsData = [];

  cards.forEach(item => {
    cardsData.push({
      key: `spotlight-cards-${item?.title}`,
      imageSrc: item?.image?.src,
      imageAlt: item?.image?.alt,
      imageAlignment: item?.image?.alignment,
      title: item?.title,
      url: item?.url,
    });
  });

  spotlightData = {
    cards: cardsData,
  };

  return spotlightData;
};
