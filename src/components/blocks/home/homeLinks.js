import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Button, Container } from "react-bootstrap"

const render = ({ links }) => {
  return (
    <Container>
      { links.map((link, index) => {
        return <Button href={link.url} variant="outline-info">{link.title}</Button>
      })}
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