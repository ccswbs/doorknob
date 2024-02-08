import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { Container } from "react-bootstrap";
import { LinkTabs } from "../components/linkTabs.js";
import { toTitleCase } from "../utils/toTitleCase.js";
import { useSearch } from "../utils/use-search.js";
import "../styles/program-search.scss";

export const ProgramCard = ({ title, acronym, url = "#", degrees = [], types = [], tags = [] }) => (
  <div className="card">
    <div className="card-body d-flex flex-column">
      <a href={url} className="card-title stretched-link text-decoration-none fw-bold fs-5">
        {acronym ? `${title} (${acronym})` : title}
      </a>
      <p className="card-text">
        {degrees.map(degree => (
          <span className="d-block" key={degree}>
            {degree}
          </span>
        ))}
      </p>
      <span className="d-block program-tags">
        {tags
          .map(tag => toTitleCase(tag))
          .sort((a, b) => a.localeCompare(b))
          .join(", ")}
      </span>
    </div>

    <div className="card-footer text-muted bg-info bg-opacity-10">{types.join(", ")}</div>
  </div>
);

export const ProgramSearch = ({ data }) => {
  const [input, setInput] = useState("");
  const filtered = useSearch(data, input);

  return (
    <Container>
      <div className="row gap-5 gap-lg-0">
        <div className="col-lg-9">
          <label htmlFor="program-search-input" className="form-label">
            What would you like to study?
          </label>
          <input
            id="program-search-input"
            className="form-control form-control-md"
            type="text"
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </div>

      <div id="program-search-grid" className="my-5">
        {filtered.map(program => (
          <ProgramCard key={program.id} {...program} />
        ))}
      </div>
    </Container>
  );
};

export default function ProgramSearchTemplate({ data, children, pageContext }) {
  const [input, setInput] = useState("");
  const filtered = useSearch(data.programs.nodes, input);

  return (
    <>
      <Container className="my-5">
        <h1 className="my-5">Search for Programs at the University of Guelph</h1>

        <LinkTabs
          tabs={pageContext.all_levels.map(level => ({ href: `/programs/${level}/`, content: toTitleCase(level) }))}
        />
      </Container>

      <Container>
        <div className="row gap-5 gap-lg-0">
          <div className="col-lg-9">
            <label htmlFor="program-search-input" className="form-label">
              What would you like to study?
            </label>
            <input
              id="program-search-input"
              className="form-control form-control-md"
              type="text"
              onChange={e => setInput(e.target.value)}
            />
          </div>
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
