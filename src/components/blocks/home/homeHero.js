import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Row } from "react-bootstrap"

export default function HomeHero () {
    
    const data = useStaticQuery(graphql`
        query {
          allNodeSpotlight(filter: {field_spotlight_rank: {eq: 1}}) {
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
    `)
    
    const imageSrc = data.allNodeSpotlight.edges[0]?.node.relationships.field_hero_image?.relationships.field_media_image.gatsbyImage;
    const imageAlt = data.allNodeSpotlight.edges[0]?.node.relationships.field_hero_image?.field_media_image.alt;
    const title = data.allNodeSpotlight.edges[0]?.node.field_spotlight_url.title;
    const defaultClasses = classNames("d-flex","p-0","h-100");
    const desktopClasses = classNames("position-absolute", "top-50", "start-50", "translate-middle");
    const [isMobile, setIsMobile] = useState(false);
    
    let url = data.allNodeSpotlight.edges[0]?.node.field_spotlight_url.url;
    let captionClasses = classNames(defaultClasses, {[desktopClasses]: !isMobile});
    
    // Check if Spotlight URL is external or internal
    if (url !== data.allNodeSpotlight.edges[0]?.node.field_spotlight_url.uri) {
        url = "https://www.uoguelph.ca" + url;
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 912); // Adjust the breakpoint as per your needs
        };

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize initially
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
    <Row id="rotator" className="mb-md-5 position-relative">
        <GatsbyImage image={getImage(imageSrc)} alt={imageAlt} />
        <div className={captionClasses} style={{ maxWidth:"1320px" }}>
            <div className="align-self-center bg-dark bg-opacity-75 w-100 p-4 p-lg-5 mb-lg-5 mt-auto text-center text-white">            
                <h2 className="h3 long-title m-auto"><a href={url} className="spotlight text-decoration-none text-white">{title}</a></h2>
            </div>
        </div>
    </Row>
   )
}