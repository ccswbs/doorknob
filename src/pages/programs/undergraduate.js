import React, { useEffect, useMemo, useState } from "react";
import { LinkTabs } from "../../components/linkTabs.js";
import { Form, Container } from "react-bootstrap";
import ProgramSearch from "../../components/blocks/programs/programs-search.js";
import { graphql } from "gatsby";
import { toTitleCase } from "../../utils/string-utils.js";

export default function ProgramsUndergraduate({ data, children }) {
  const [onlyCoop, setOnlyCoop] = useState(false);
  const types = Array.from(new Set(data.programs.nodes.flatMap(program => program.types)));
  const [type, setType] = useState("any");

  const filterer = useMemo(
    () => program => {
      if (type !== "any" && !program.types.includes(type)) return false;
      if (onlyCoop && !program.types.some(type => type.toLowerCase() === "co-op")) return false;
      return true;
    },
    [onlyCoop, type],
  );

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

      <ProgramSearch
        programs={data.programs.nodes}
        sidebar={
          <>
            <Form.Label htmlFor="program-search-undergraduate-type">Filter by type</Form.Label>

            <Form.Select
              id="program-search-undergraduate-type"
              aria-label="Default select example"
              onChange={e => {
                setType(e.target.value);
              }}
            >
              <option value="any">Any</option>
              <option value="major">Major</option>
              <option value="minor">Minor</option>
              <option value="area-of-concentration">Area of Concentration</option>
            </Form.Select>
          </>
        }
        filterer={filterer}
      >
        {
          <Form.Check
            type="checkbox"
            id="program-search-co-op-checkbox"
            label="Only show programs offering co-op"
            className="mt-2"
            onChange={e => setOnlyCoop(e.target.checked)}
          />
        }
      </ProgramSearch>
    </>
  );
}

export const query = graphql`
  query {
    programs: allUndergraduateProgramsYaml(sort: { fields: title, order: ASC }) {
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
