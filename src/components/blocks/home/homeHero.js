import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ id }) => {
  return <></>
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_hero"}) {
        id
    }
  }
`

export default function HomeHero () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}