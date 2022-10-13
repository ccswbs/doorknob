import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Overlay from "../../shared/overlay"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

const QuoteMark = styled.i`
    color: var(--bs-yellow);
`

const render = ({ content, background }) => {
  return (
    <Row className="bg-black content-block">
      <Overlay.GatsbyImage 
          gatsbyImageData={getImage(background.src)} 
          alt={background.alt} 
          className="opacity-75 h-100">
        <Container>
          <Row className="bg-transparent h-100 text-white pb-0">
            <Col lg={6} className="mb-4 d-flex flex-column justify-content-center">
              <blockquote className="display-3 text-white text-center">
                <QuoteMark className="fa-solid fa-quote-left pe-2" aria-hidden="true" /> 
                  <em>{content.blockquote}</em>
                <QuoteMark className="fa-solid fa-quote-right ps-2" aria-hidden="true" />
              </blockquote>
            </Col>

            <Col lg={6} className="d-flex justify-content-center">
              <GatsbyImage image={getImage(content.foreground.src)} alt={content.foreground.alt} className="align-self-end img-fluid" />
            </Col>
          </Row>
        </Container>
      </Overlay.GatsbyImage>

      <Col lg={12} className="align-items-center d-flex fs-4 justify-content-center p-3 text-white">
        <p className="mb-0">{content.cta}</p>
        <button type="button" className="btn btn-primary ms-4 my-4"><i className="fa-solid fa-play me-2" /> Watch Video</button>
      </Col>
    </Row>
  )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_story"}) {
      id
      content {
        blockquote
        foreground {
          src {
            childImageSharp {
              gatsbyImageData (
                height: 600
              )
            }
          }
          alt
        }
        cta
      }
      background {
        src {
          childImageSharp {
            gatsbyImageData (
              width: 1400,
              height: 340,
            )
          }
        }
        alt
      }
    }
  }
`

export default function HomeStory () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}