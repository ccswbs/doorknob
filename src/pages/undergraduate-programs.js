import React from "react"
import { Container } from "react-bootstrap"
import "../styles/program-search.scss"
import {ProgramSearch} from "../components/blocks/programs/programSearch";
import {useUndergraduatePrograms} from "../hooks/yaml/use-undergraduate-programs";

const UndergraduatePrograms = () => {
  const data = useUndergraduatePrograms()

  return (
    <React.Fragment>
      <Container>
        <h1 className="my-5">Undergraduate Programs</h1>
      </Container>

      <ProgramSearch data={data} />
    </React.Fragment>
  )
}

export default UndergraduatePrograms
