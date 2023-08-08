import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Statistic from "../../../components/shared/statistic"
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
    <Container className="content-block">
      <Statistic.Gradient stats={stats} />
    </Container>
  )
}
