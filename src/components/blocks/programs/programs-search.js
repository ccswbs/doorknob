import React, { useState } from "react";
import { Form, Container } from "react-bootstrap";
import { useSearch } from "../../../hooks/use-search.js";
import * as styles from "../../../styles/program-search.module.css";

export default function ProgramSearch({ programs, children, filterer, sidebar }) {
  const [input, setInput] = useState("");
  const filtered = useSearch(programs, input);

  return (
    <>
      <Container>
        <div className="row gap-5 gap-lg-0">
          <div className={`${sidebar ? "col-lg-9" : "col-lg-12"} d-flex flex-column`}>
            <Form.Label htmlFor="program-search-input">What do you want to study?</Form.Label>
            <Form.Control
              type="text"
              id="program-search-input"
              onChange={e => setInput(e.target.value)}
            />
          </div>

          {sidebar && <div className="col-lg-3">{sidebar}</div>}
        </div>

        <div className="d-flex flex-column justify-content-between">{children}</div>

        <div className={`${styles.grid} my-5`}>
          {filtered.filter(filterer ?? (() => true)).map(program => (
            <a href={program.url} key={program.id} className={`${styles.card}`}>
              {program.title}
            </a>
          ))}
        </div>
      </Container>
    </>
  );
}
