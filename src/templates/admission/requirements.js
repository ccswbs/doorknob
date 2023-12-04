import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { Container, Tab, Tabs } from "react-bootstrap"

export default function UndergraduateRequirements({ data, children, pageContext }) {
  const main = data.main.nodes[0]
  const parents = data.parents.nodes

  const renderMainContent = content => (
    <div className="mt-4" dangerouslySetInnerHTML={{ __html: main?.content?.[content] }}></div>
  )

  const renderParentContent = content => {
    return parents.map(parent => (
      <div className="mt-4" key={parent.slug} dangerouslySetInnerHTML={{ __html: parent?.content?.[content] }}></div>
    ))
  }

  return (
    <Container className="mt-4">
      <h1 className="my-5">{`Admission Requirements for ${main.title}`}</h1>

      <Tabs defaultActiveKey="requirements" id="admission-requirements-tabs" justify>
        <Tab eventKey="requirements" title="Requirements">
          {renderParentContent("requirements")}
          {renderMainContent("requirements")}
        </Tab>
        <Tab eventKey="before-applying" title="Before Applying">
          {renderParentContent("before_applying")}
          {renderMainContent("before_applying")}
        </Tab>
        <Tab eventKey="how-to-apply" title="How to Apply">
          {renderParentContent("how_to_apply")}
          {renderMainContent("how_to_apply")}
        </Tab>
        <Tab eventKey="after-applying" title="After Applying">
          {renderParentContent("after_applying")}
          {renderMainContent("after_applying")}
        </Tab>
      </Tabs>
    </Container>
  )
}

export const query = graphql`
  query ($slug: String!, $parents: [String!]!) {
    main: allAdmissionRequirementsYaml(filter: { slug: { eq: $slug } }) {
      nodes {
        slug
        title
        content {
          requirements
          before_applying
          how_to_apply
          after_applying
        }
      }
    }
    parents: allAdmissionRequirementsYaml(filter: { slug: { in: $parents } }, sort: { slug: DESC }) {
      nodes {
        slug
        title
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
