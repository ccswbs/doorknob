import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Statistic from "../../shared/tw-statistic"
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
    <Container className="content-block">
      <h2 className="mt-5 mb-5">How We Rank Among the World</h2>

      <Statistic.Gradient stats={stats} />
    </Container>
    </>
  )
}
