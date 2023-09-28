import React, { useState, useEffect } from "react"
import { useProgramData } from "../hooks/yaml/use-program-data"
import { Card, Container } from "react-bootstrap"

const Program = ({ title = "", url = "", degrees = [], types = [] }) => {
  return (
    <div className="mb-5">
      <div className="h5">{title}</div>

      {degrees.map(degree => (
        <div key={degree}>{degree}</div>
      ))}

      <div>{types.join(", ")}</div>
    </div>
  )
}

const ProgramSearch = () => {
  const data = useProgramData()
  const [input, setInput] = useState("")

  return (
    <Container>
      <h1>Program Search</h1>
      <input type="text" onChange={e => setInput(e.target.value)} />
      <div className="my-5">
        {data
          .filter(program => {
            return program.title.toLowerCase().includes(input.toLowerCase())
          })
          .map(program => (
            <Program key={program.id} {...program} />
          ))}
      </div>
    </Container>
  )
}

export default ProgramSearch
