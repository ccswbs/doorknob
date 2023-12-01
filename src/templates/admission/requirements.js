import React from "react"
import { graphql } from "gatsby"
import { Container } from "react-bootstrap"

export default function UndergraduateRequirements({ data, children, pageContext }) {
  const main = data.main.nodes[0]
  const parents = data.parents.nodes

  return (
    <Container className="mt-4">
      <h1 className="my-5">{`Admission Requirements for ${main.title}`}</h1>
      <ul className="nav nav-tabs nav-fill" id="admission-requirements-tabs">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="requirements-tab" data-bs-toggle="tab" data-bs-target="#requirements">
            Admission Requirements
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="before-applying-tab" data-bs-toggle="tab" data-bs-target="#before-applying">
            Before Applying
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="how-to-apply-tab" data-bs-toggle="tab" data-bs-target="#how-to-apply">
            How to Apply
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="after-applying-tab" data-bs-toggle="tab" data-bs-target="#after-applying">
            Applying
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane active" id="requirements" role="tabpanel" aria-labelledby="home-tab">
          {parents.map(parent => (
            <div
              className="mt-4"
              key={parent.slug}
              dangerouslySetInnerHTML={{ __html: parent?.content?.requirements }}
            ></div>
          ))}

          <div className="mt-4" dangerouslySetInnerHTML={{ __html: main?.content?.requirements }}></div>
        </div>
        <div className="tab-pane" id="before-applying" role="tabpanel" aria-labelledby="before-applying-tab">
          {parents.map(parent => (
            <div
              className="mt-4"
              key={parent.slug}
              dangerouslySetInnerHTML={{ __html: parent?.content?.before_applying }}
            ></div>
          ))}

          <div className="mt-4" dangerouslySetInnerHTML={{ __html: main?.content?.before_applying }}></div>
        </div>
        <div className="tab-pane" id="how-to-apply" role="tabpanel" aria-labelledby="how-to-apply-tab">
          {parents.map(parent => (
            <div
              className="mt-4"
              key={parent.slug}
              dangerouslySetInnerHTML={{ __html: parent?.content?.how_to_apply }}
            ></div>
          ))}

          <div className="mt-4" dangerouslySetInnerHTML={{ __html: main?.content?.how_to_apply }}></div>
        </div>
        <div className="tab-pane" id="after-applying" role="tabpanel" aria-labelledby="after-applying-tab">
          {parents.map(parent => (
            <div
              className="mt-4"
              key={parent.slug}
              dangerouslySetInnerHTML={{ __html: parent?.content?.after_applying }}
            ></div>
          ))}

          <div className="mt-4" dangerouslySetInnerHTML={{ __html: main?.content?.after_applying }}></div>
        </div>
      </div>
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
