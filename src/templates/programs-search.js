import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { Container } from "react-bootstrap";
import { LinkTabs } from "../components/linkTabs.js";
import { toTitleCase } from "../utils/toTitleCase.js";
import { ProgramSearch } from "../components/blocks/programs/programSearch.js";
import "../styles/program-search.scss"

export default function ProgramSearchTemplate({ data, children, pageContext }) {
  return (
    <>
      <Container className="my-5">
        <h1 className="my-5">Search for Programs</h1>

        <LinkTabs
          tabs={pageContext.all_levels.map(level => ({ href: `/programs/${level}/`, content: toTitleCase(level) }))}
        />
      </Container>

      <ProgramSearch data={data.programs.nodes} />
    </>
  );
}

export const query = graphql`
  query ($level: String!) {
    programs: allProgramsYaml(filter: { level_of_education: { eq: $level } }) {
      nodes {
        id
        title
        acronym
        url
        types
        degrees
        tags
      }
    }
  }
`;
