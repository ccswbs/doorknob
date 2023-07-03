import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"
import styled from "styled-components"

const query = graphql`
  query {
    blockYaml(yamlId: { eq: "home_links_primary" }) {
      id
      links {
        title
        url
      }
    }
  }
`

const Link = styled.a`
  height: 6rem;

  @media screen and (min-width: 768px) {
    height: 8rem;
  }
`;

export default function HomeLinksPrimary() {
  const data = useStaticQuery(query)
  const links = data.blockYaml.links
  return (
    <Container className="content-block">
      <h2 className="text-primary mt-5 mb-5">Welcome to the University of Guelph</h2>

      <ul className="list-unstyled row g-md-5 g-3">
        {links.map(link => (
          <li className="col-md-4">
            <Link
              key={link.url}
              className="btn btn-dark w-100 d-flex align-items-center justify-content-center"
              href={link.url}
            >
              <h3 className="fs-5 fw-normal">{link.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
