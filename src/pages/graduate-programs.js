import React from "react"
import { Container } from "react-bootstrap"
import "../styles/program-search.scss"
import { ProgramSearch } from "../components/blocks/programs/programSearch"
import {useGraduatePrograms} from "../hooks/yaml/use-graduate-programs";

const GraduatePrograms = () => {
  const data = useGraduatePrograms();

  return (
    <React.Fragment>
      <Container>
        <h1 className="my-5">Graduate Programs</h1>
      </Container>

      <ProgramSearch data={data} />
    </React.Fragment>
  )
}

export default GraduatePrograms
