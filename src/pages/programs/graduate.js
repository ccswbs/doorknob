import React, { useMemo, useState } from "react";
import { LinkTabs } from "../../components/linkTabs.js";
import { Container, Form } from "react-bootstrap";
import ProgramSearch from "../../components/blocks/programs/programs-search.js";
import { graphql } from "gatsby";
import { toTitleCase } from "../../utils/string-utils.js";

export default function ProgramsGraduate({ data, children }) {
  const types = Array.from(new Set(data.programs.nodes.flatMap(program => program.types)));
  const [type, setType] = useState("any");

  const filterer = useMemo(
    () => program => {
      if (type === "any") return true;
      return program.types.includes(type);
    },
    [type],
  );

  return (
    <>
      <Container className="my-5">
        <h1 className="my-5">Graduate Programs at the University of Guelph</h1>

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
        filterer={filterer}
        sidebar={
          <>
            <Form.Label htmlFor="program-search-graduate-type">Filter by type</Form.Label>

            <Form.Select
              id="program-search-graduate-type"
              aria-label="Default select example"
              onChange={e => {
                setType(e.target.value);
              }}
            >
              <option defaultChecked={true} value="any">
                Any
              </option>

              {types?.map(type => (
                <option key={type} value={type}>
                  {toTitleCase(type.replaceAll("-", " "))}
                </option>
              ))}
            </Form.Select>
          </>
        }
      ></ProgramSearch>
    </>
  );
}

export const query = graphql`
  query {
    programs: allGraduateProgramsYaml(sort: { fields: title, order: ASC }) {
      nodes {
        id
        title
        url
        tags
        types
      }
    }
  }
`;
