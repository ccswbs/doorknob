import React from "react";
import { LinkTabs } from "../../components/linkTabs.js";
import { Container } from "react-bootstrap";
import ProgramSearch from "../../components/blocks/programs/programs-search.js";
import { graphql } from "gatsby";

export default function ProgramsContinuingEducation({ data, children }) {
  return (
    <>
      <Container className="my-5">
        <h1 className="my-5">Continuing Education at the University of Guelph</h1>

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

      <ProgramSearch programs={data.programs.nodes} />
    </>
  );
}

export const query = graphql`
  query {
    programs: allContinuingEducationProgramsYaml(sort: { fields: title, order: ASC }) {
      nodes {
        id
        title
        url
        tags
      }
    }
  }
`;
