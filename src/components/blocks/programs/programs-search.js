import React, { useMemo, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { useSearch } from "../../../hooks/use-search.js";
import * as styles from "../../../styles/program-search.module.css";
import { toTitleCase } from "../../../utils/string-utils.js";

export default function ProgramSearch({ programs, children, filterer, sidebar }) {
  const [input, setInput] = useState("");
  const types = Array.from(new Set(programs.flatMap(program => program.types)));
  const [type, setType] = useState("any");

  const filtered = useSearch(programs, input);

  return (
    <>
      <Container>
        <div className="row gap-5 gap-lg-0">
          <div className="col-lg-9 d-flex flex-column">
            <Form.Label htmlFor="program-search-input">What do you want to study?</Form.Label>
            <Form.Control type="text" id="program-search-input" onChange={e => setInput(e.target.value)} />
          </div>

          <div className="col-lg-3">
            <Form.Label htmlFor="program-search-undergraduate-type">Filter by type</Form.Label>

            <Form.Select
              id="program-search-undergraduate-type"
              aria-label="Default select example"
              onChange={e => {
                setType(e.target.value);
              }}
            >
              <option value="any">Any</option>

              {types?.map(type => (
                <option key={type} value={type}>
                  {type === "co-op" ? "Co-op" : toTitleCase(type?.replaceAll("-", " "))}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-between">{children}</div>

        <div className={`${styles.grid} my-5`}>
          {filtered
            .filter(program => !(type !== "any" && !program.types.includes(type)))
            .map(program => (
              <a href={program.url} key={program.id} className={`${styles.card}`}>
                {program.title}
              </a>
            ))}
        </div>
      </Container>
    </>
  );
}
