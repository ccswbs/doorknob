import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Statistic from "../../../components/shared/statistic"

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
  const stats = useStaticQuery(query).blockYaml.stats;  
  return <Statistic.Gradient stats={stats} />;
}