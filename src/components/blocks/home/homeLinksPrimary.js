import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const query = graphql`
  query {
    blockYaml(yamlId: { eq: "home_links_primary" }) {
      id
      links {
        title
        url
        image {
          src {
            childImageSharp {
              gatsbyImageData(width: 300)
            }
          }
          alt
        }
      }
    }
  }
`

export default function HomeLinksPrimary() {
  const data = useStaticQuery(query)
  const links = data.blockYaml.links
  return (
    <Container className="content-block homepage-primary-links">
      <h2 className="text-primary mt-5 mb-5">Welcome</h2>

      <ul className="list-unstyled row g-md-5 g-3">
        {links.map(link => (
          <li key={link.url} className="col-md-4 position-relative">
            <GatsbyImage image={getImage(link.image.src)} alt={link.image.alt} className="w-100" />
            <a
              className="btn btn-dark w-100 d-flex align-items-center justify-content-center stretched-link"
              href={link.url}
            >
              <h3 className="fs-5 fw-normal">{link.title}</h3>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  )
}
