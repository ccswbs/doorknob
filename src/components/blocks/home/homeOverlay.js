import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Overlay from "../../shared/overlay"
import { getImage } from "gatsby-plugin-image"
import { Row, Col, Container } from "react-bootstrap"

const Shadow = styled.p`
  text-shadow: 0px 0px 4px #ffffff;
  &:hover, &:focus {
    text-shadow: none;
  }
`

const render = ({ title, link, background }) => {
  return (
      <Row>
        <Overlay.GatsbyImage gatsbyImageData={getImage(background.src)} alt={background.alt}>
            <Container className="d-flex h-100 w-100 p-5 justify-content-center align-items-center">
              <Col className="text-center"> 
                <h2 className="display-2 text-dark">{title}</h2>
                <Shadow><a href={link.url}>{link.title}</a></Shadow>
              </Col>
            </Container>
        </Overlay.GatsbyImage>
      </Row>
  )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_overlay"}) {
        id
        title
        link {
          title
          url
        }
        background {
          src {
            childImageSharp {
              gatsbyImageData (
                width: 1920
              )
            }
          }
          alt
        }
    }
  }
`

export default function HomeStats () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}