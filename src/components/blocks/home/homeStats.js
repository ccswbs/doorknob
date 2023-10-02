import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Statistic from "../../shared/statistic"
import { Container } from "react-bootstrap"

const query = graphql`
  query {
    blockYaml(yamlId: { eq: "home_stats" }) {
      id
      title
      stats {
        field_statistic_represents
        field_statistic_value
      }
    }
  }
`
export default function HomeStats() {
  const stats = useStaticQuery(query).blockYaml.stats
  return (
    <>
      <div className="tw-container tw-content-block">
        <h2 className="tw-my-12">How We Rank Among the World</h2>

        <Statistic.Gradient stats={stats} fullWidthBG={false} />
      </div>
    </>
  )
}
