import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { Container, Tab, Tabs } from "react-bootstrap";

export default function AdmissionRequirements({ data, children, pageContext }) {
  const requirements = [...(data?.requirement?.parents ?? []), data?.requirement];

  const renderRequirementContent = content => (
    <>
      {requirements.map(requirement => (
        <div key={requirement.id} dangerouslySetInnerHTML={{ __html: requirement?.content?.[content] }}></div>
      ))}
    </>
  );

  return (
    <Container className="my-5" id="admission-requirements-page">
      <h1 className="my-5">{data.requirement.title}</h1>

      <Tabs defaultActiveKey="requirements" id="admission-requirements-tabs" justify>
        <Tab eventKey="requirements" title="Academic Requirements">
          <h2 className="mt-5">Academic Requirements</h2>
          {renderRequirementContent("requirements")}
        </Tab>
        <Tab eventKey="before-applying" title="Before Applying">
          <h2 className="mt-5">Before Applying</h2>
          {renderRequirementContent("before_applying")}
        </Tab>
        <Tab eventKey="how-to-apply" title="How to Apply">
          <h2 className="mt-5">How to Apply</h2>
          {renderRequirementContent("how_to_apply")}
        </Tab>
        <Tab eventKey="after-applying" title="After Applying">
          <h2 className="mt-5">After Applying</h2>
          {renderRequirementContent("after_applying")}
        </Tab>
      </Tabs>
    </Container>
  );
}

export const query = graphql`
  query ($id: String!) {
    requirement: admissionRequirementsYaml(id: { eq: $id }) {
      id
      title
      content {
        requirements
        before_applying
        how_to_apply
        after_applying
      }
      parents {
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
`;
