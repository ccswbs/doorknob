import { useStaticQuery, graphql } from "gatsby";

function getLink(url) {
  // Assume internal URL by default
  let spotlightLink = "https://www.uoguelph.ca" + url.url;

  // Check if Spotlight URL is external
  if (url?.url === url?.uri) {
    spotlightLink = url.url;
  }
  return spotlightLink;
}

export const useSpotlightData = () => {
  let spotlightData = {};

  /* -------
  // hero
    // Query will search for field_spotlight_rank 1

  // cards:
    // Query will sort first by rank, then by recently changed. 
    // Rank 1 will be skipped since it's for the Hero image
    // Only a maxiumum of 4 published nodes will be returned
  --------- */
  const data = useStaticQuery(
    graphql`
      query {
        hero: allNodeSpotlight(
          sort: {changed: DESC}
          filter: {field_spotlight_rank: {eq: 1}}
          limit: 1
          ) {
          edges {
            node {
              field_spotlight_alignment
              field_spotlight_image_alignment
              field_spotlight_button
              field_spotlight_caption
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
                      gatsbyImage(
                        width: 1680
                        height: 640
                        formats: [AUTO, WEBP]
                      )
                    }
                  }
                }
              }
              drupal_id
              title
            }
          }
        }
        cards: allNodeSpotlight(
          sort: [{field_spotlight_rank: ASC}, {changed: DESC}]
          filter: {status: {eq: true}}
          limit: 5
        ) {
          edges {
            node {
              drupal_id
              field_spotlight_image_alignment
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
                      gatsbyImage(
                        width: 640
                        formats: [AUTO, WEBP]
                      )
                    }
                  }
                }
              }
            }
          }
        }
      }
  `)

  const hero = data.hero;
  let heroData = [];

  hero.edges.forEach((item) => {
    heroData.push({
      imageSrc: item?.node?.relationships.field_hero_image?.relationships.field_media_image.gatsbyImage,
      imageAlt: item?.node?.relationships.field_hero_image?.field_media_image.alt,
      imageAlignment: item?.node?.field_spotlight_image_alignment,
      buttonText: item?.node?.field_spotlight_button,
      captionAlign: item?.node?.field_spotlight_alignment,
      captionText: item?.node?.field_spotlight_caption,
      title: item?.node?.title,
      url: getLink(item?.node?.field_spotlight_url)
    })
  });

  const cards = data.cards;
  let cardsData = [];

  cards.edges.forEach((item) => {
    cardsData.push({
      key: item?.node?.drupal_id,
      imageSrc: item?.node?.relationships.field_hero_image?.relationships.field_media_image.gatsbyImage,
      imageAlt: item?.node?.relationships.field_hero_image?.field_media_image.alt,
      imageAlignment: item?.node?.field_spotlight_image_alignment,
      title: item?.node?.field_spotlight_url.title,
      url: getLink(item?.node?.field_spotlight_url)
    })
  });

  // Remove first item of array (a.k.a. the hero)
  cardsData.shift();

  spotlightData = {
    hero: heroData,
    cards: cardsData
  }

  return spotlightData;
}
