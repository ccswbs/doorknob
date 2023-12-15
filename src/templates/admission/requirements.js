import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Container, Tab, Tabs } from "react-bootstrap"

export default function Requirements({ data, children, pageContext }) {
  const requirements = data.requirements.nodes

  console.log(requirements)

  return (
    <Container className="my-5">
      <h1 className="my-5">{`Admission Requirements for`}</h1>

      <Tabs defaultActiveKey="requirements" id="admission-requirements-tabs" justify>
        <Tab eventKey="requirements" title="Academic Requirements">
          <h2 className="mt-5">Academic Requirements</h2>
        </Tab>
        <Tab eventKey="before-applying" title="Before Applying">
          <h2 className="mt-5">Before Applying</h2>
        </Tab>
        <Tab eventKey="how-to-apply" title="How to Apply">
          <h2 className="mt-5">How to Apply</h2>
        </Tab>
        <Tab eventKey="after-applying" title="After Applying">
          <h2 className="mt-5">After Applying</h2>
        </Tab>
      </Tabs>
    </Container>
  )
}

export const query = graphql`
  query ($requirements: [String!]!) {
    requirements: allAdmissionRequirementsYaml(filter: { id: { in: $requirements } }) {
      nodes {
        id
        content {
          requirements
          before_applying
          how_to_apply
          after_applying
        }
      }
    }
  }
`
