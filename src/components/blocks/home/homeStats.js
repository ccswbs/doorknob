import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Statistic from "../../../components/shared/statistic"

const render = ({ stats }) => {
  return <Statistic.Gradient stats={stats} />
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_stats"}) {
        id
        title
        stats {
          field_statistic_represents
          field_statistic_value
        }
    }
  }
`

export default function HomeStats () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}