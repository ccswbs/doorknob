import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PageContainer from "../../shared/pageContainer"
import styled from "styled-components"
import Overlay from "../../shared/overlay"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { Col, Row } from "react-bootstrap"

const Text = styled.div`
  text-shadow: 2px 2px 8px rgb(0 0 0 / 99%);
`
const Title = styled.h3`
  font-size: 2.5rem;
  color: #fff;
  text-transform: uppercase;
`
const QuoteMark = styled.i`
    color: var(--bs-yellow);
`

const render = ({ content, background }) => {
  return (
    <div className="bg-black">
      <Overlay.GatsbyImage 
          gatsbyImageData={getImage(background.src)} 
          alt={background.alt} 
          className="opacity-75 h-100">
        <PageContainer>
          <Row className="bg-transparent h-100 text-white pb-0">
            <Col lg={6} className="mb-4 d-flex flex-column justify-content-center">
              <blockquote className="display-3 text-white">
                  <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
                      <em>{content.blockquote}</em>
                  <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
              </blockquote>
            </Col>

            <Col lg={6} className="d-flex justify-content-center">
                <GatsbyImage image={getImage(content.foreground.src)} alt={content.foreground.alt} className="align-self-end img-fluid" />
            </Col>
          </Row>
        </PageContainer>
      </Overlay.GatsbyImage>
      <PageContainer>
        <Col lg={12} className="d-flex text-white fs-3 justify-content-center">
          <p>{content.cta}</p>
        </Col>
      </PageContainer>
    </div>
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