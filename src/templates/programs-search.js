import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { Form, Container, InputGroup } from "react-bootstrap";
import { LinkTabs } from "../components/linkTabs.js";
import { toTitleCase } from "../utils/toTitleCase.js";
import { useSearch } from "../hooks/use-search.js";
import * as styles from "../styles/program-search.module.css";

const ProgramCard = ({ title, acronym, url = "#", degrees = [], types = [], tags = [] }) => (
  <a href={url} className={`${styles.card}`}>
    {title}
  </a>
);

const levelToTitle = level => `${toTitleCase(level)}${level === "continuing-education" ? "" : " Programs"}`;

export default function ProgramSearchTemplate({ data, children, pageContext }) {
  const [input, setInput] = useState("");
  const filtered = useSearch(data.programs.nodes, input);
  const [onlyMajors, setOnlyMajors] = useState(false);
  const [onlyCoop, setOnlyCoop] = useState(false);

  return (
    <>
      <Container className="my-5">
        <h1 className="my-5">{levelToTitle(pageContext.level)} at the University of Guelph</h1>

        <LinkTabs
          tabs={pageContext.all_levels.map(level => ({ href: `/programs/${level}/`, content: levelToTitle(level) }))}
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
            <div className="d-flex flex-column justify-content-between">
              <Form.Check
                type="checkbox"
                id="program-search-majors-checkbox"
                label="Only show majors"
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
            </div>
          )}
        </div>

        <div className={`${styles.grid} my-5`}>
          {filtered
            .filter(program => {
              if (onlyMajors && !program.types.includes("Major")) return false;
              if (onlyCoop && !program.types.includes("Co-op")) return false;

              return true;
            })
            .map(program => (
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
