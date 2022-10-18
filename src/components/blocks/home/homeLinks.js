import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"

const render = ({ links }) => {
  return (
    <Container className="content-block">
      <div className="d-grid d-md-block gap-3">
        { links.map((link, index) => {
          return <a href={link.url} key={`homelinks-${index}`} className="btn btn-outline-info mb-md-3 me-md-3 p-4 text-start">{link.title}</a>
        })}
      </div>
    </Container>
  )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_links"}) {
        id
        links {
          title
          url
        }
    }
  }
`

export default function HomeLinks () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}