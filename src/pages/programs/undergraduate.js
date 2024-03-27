import React, { useState } from "react";
import { LinkTabs } from "../../components/linkTabs.js";
import { Form, Container } from "react-bootstrap";
import ProgramSearch from "../../components/blocks/programs/programs-search.js";
import { graphql } from "gatsby";

export default function ProgramsUndergraduate({ data, children }) {
  const [onlyMajors, setOnlyMajors] = useState(false);
  const [onlyCoop, setOnlyCoop] = useState(false);

  return (
    <>
      <Container className="my-5">
        <h1 className="my-5">Undergraduate Programs at the University of Guelph</h1>

        <LinkTabs
          tabs={[
            {
              href: "/programs/undergraduate/",
              content: "Undergraduate Programs",
            },
            {
              href: "/programs/graduate/",
              content: "Graduate Programs",
            },
            {
              href: "/programs/certificate-and-diploma/",
              content: "Certificate and Diploma Programs",
            },
            {
              href: "/programs/continuing-education/",
              content: "Continuing Education",
            },
          ]}
        />
      </Container>

      <ProgramSearch programs={data.programs.nodes}>
        {
          <>
            <Form.Check
              type="checkbox"
              id="program-search-majors-checkbox"
              label="Only show programs offered as a major"
              className="mt-2"
              onChange={e => setOnlyMajors(e.target.checked)}
            />

            <Form.Check
              type="checkbox"
              id="program-search-co-op-checkbox"
              label="Only show programs offering co-op"
              className="mt-2"
              onChange={e => setOnlyCoop(e.target.checked)}
            />
          </>
        }
      </ProgramSearch>
    </>
  );
}

export const query = graphql`
  query {
    programs: allProgramsYaml(filter: { level_of_education: { eq: "undergraduate" } }) {
      nodes {
        id
        title
        url
        types
        tags
      }
    }
  }
`;
