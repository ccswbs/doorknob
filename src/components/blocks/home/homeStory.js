import React from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Overlay from "../../shared/overlay"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"
import ModalVideo from "../../shared/modalVideo"

const QuoteMark = styled.i`
    color: var(--bs-yellow);
`

const ForegroundImage = styled(GatsbyImage)`
  @media (min-width: 1200px) {
    margin-top: -5rem;
  }
`

const render = ({ content, background }) => {
  return (
    <Row className="bg-black content-block">
      <Overlay.GatsbyImage 
          gatsbyImageData={getImage(background.src)} 
          alt={background.alt} 
          className="opacity-75 h-100">
        <Container>
          <Row className="bg-transparent h-100 text-white pb-0 px-5 pt-5">

            <Col xl={6} className="mb-4 d-flex flex-column justify-content-center">
              <blockquote className="display-4 text-white text-center">
                <QuoteMark className="fa-solid fa-quote-left pe-2" aria-hidden="true" /> 
                  <em>{content.blockquote}</em>
                <QuoteMark className="fa-solid fa-quote-right ps-2" aria-hidden="true" />
              </blockquote>
            </Col>

            <Col xl={6} className="d-flex justify-content-center">
              <ForegroundImage image={getImage(content.foreground.src)} alt={content.foreground.alt} className="align-self-end img-fluid" />
            </Col>
          </Row>
        </Container>
      </Overlay.GatsbyImage>
      <div className="bg-black">
        <Container>
          <Row>
            <Col lg={12} className="align-items-center d-flex fs-4 justify-content-center p-3 text-white">
              <p className="mb-0">{content.cta}</p>
              <ModalVideo 
                id={content.video.id} 
                src={content.video.url} 
                title={content.video.title} 
                transcript={content.video.transcript} 
                modalButton = {
                    <button type="button" className="btn btn-primary ms-4 my-4">
                        <i className="fa-solid fa-play me-2" /> Watch Video<span className="visually-hidden">: {content.video.title}</span>
                    </button>
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
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
                height: 390
              )
            }
          }
          alt
        }
        cta
        video {
          id
          type
          title
          url
          transcript
          captions
        }
      }
      background {
        src {
          childImageSharp {
            gatsbyImageData (
              width: 1400,
              height: 300,
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