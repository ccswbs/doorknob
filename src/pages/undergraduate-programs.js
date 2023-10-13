import React from "react"
import { Container } from "react-bootstrap"
import "../styles/program-search.scss"
import {ProgramSearch} from "../components/blocks/programs/programSearch";
import {useUndergraduatePrograms} from "../hooks/yaml/use-undergraduate-programs";
import { ProgramTabs } from "../components/blocks/programs/programTabs";

const UndergraduatePrograms = () => {
  const data = useUndergraduatePrograms()

  return (
    <React.Fragment>
      <Container className="my-5">
        <h1 className="my-5">Undergraduate Programs</h1>
        <ProgramTabs />
      </Container>

      <ProgramSearch data={data} />
    </React.Fragment>
  )
}

export default UndergraduatePrograms
