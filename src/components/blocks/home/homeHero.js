import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Row } from "react-bootstrap"

/* TODO: add and use classNames utility to create variables for mobile vs desktop Bootstrap classes */

export default function HomeHero () {
    
    const data = useStaticQuery(graphql`
      query {
        blockYaml(yamlId: {eq: "home_cards_spotlight"}) {
          id
          cards {
            title
            url
            image {
              src {
                childImageSharp {
                  gatsbyImageData (
                    height: 800
                  )
                }
              }
              alt
            }
          }
        }
      }
    `)
    
    const image = data.blockYaml.cards[0].image;
    const title = data.blockYaml.cards[0].title;
    const url = data.blockYaml.cards[0].url;
    const defaultClasses = classNames("d-flex","p-0","h-100");
    const desktopClasses = classNames("position-absolute", "top-50", "start-50", "translate-middle");
    
    const [isMobile, setIsMobile] = useState(false);
    
    let captionClasses = classNames(defaultClasses, {[desktopClasses]: !isMobile});    

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
        <GatsbyImage image={getImage(image.src)} alt={image.alt} />
        <div className={captionClasses} style={{ maxWidth:"1320px" }}>
            <div className="align-self-center bg-dark bg-opacity-75 w-100 p-4 p-lg-5 mb-lg-5 mt-auto text-center text-white">            
                <h2 className="h3 long-title m-auto"><a href={url} className="spotlight text-decoration-none text-white">{title}</a></h2>
            </div>
        </div>
    </Row>
   )
}