import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { Form, Container, InputGroup } from "react-bootstrap";
import { LinkTabs } from "../components/linkTabs.js";
import { toTitleCase } from "../utils/toTitleCase.js";
import { useSearch } from "../utils/use-search.js";
import "../styles/program-search.scss";

const ProgramCard = ({ title, acronym, url = "#", degrees = [], types = [], tags = [] }) => (
  <div className="card">
    <div className="card-body d-flex flex-column">
      <a href={url} className="card-title stretched-link text-decoration-none fs-6">
        {title}
      </a>
    </div>
  </div>
);

export default function ProgramSearchTemplate({ data, children, pageContext }) {
  const [programs, setPrograms] = useState(data.programs.nodes);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const filtered = useSearch(programs, input);

  useEffect(() => {
    checked
      ? setPrograms(data.programs.nodes.filter(program => program.types.includes("Co-op")))
      : setPrograms(data.programs.nodes);
  }, [data.programs.nodes, checked]);

  return (
    <>
      <Container className="my-5">
        <h1 className="my-5">{toTitleCase(pageContext.level)} {pageContext.level === "continuing-education" ? "" : "Programs"} at the University of Guelph</h1>

        <LinkTabs
          tabs={pageContext.all_levels.map(level => ({ href: `/programs/${level}/`, content: toTitleCase(level) }))}
        />
      </Container>

      <Container>
        <div className="gap-5 gap-lg-0">
          <Form.Label htmlFor="program-search-input">What do you want to study?</Form.Label>
          <Form.Control
            className={pageContext.level === "undergraduate" ? "col-lg-9" : "col-lg-12"}
            type="text"
            id="program-search-input"
            onChange={e => setInput(e.target.value)}
          />

          {pageContext.level === "undergraduate" && (
            <Form.Check
              type="checkbox"
              id="program-search-co-op-checkbox"
              label="Only show co-op programs"
              className="mt-2"
              onChange={e => setChecked(e.target.checked)}
            />
          )}
        </div>

        <div id="program-search-grid" className="my-5">
          {filtered.map(program => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>
      </Container>
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
