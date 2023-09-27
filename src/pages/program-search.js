import React, { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import { useProgramData } from "../hooks/yaml/use-program-data"

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
            <div className="mb-3">
              <h2>{program.title}</h2>
              <p>{JSON.stringify(program.degree)}</p>
              <p>{program.tags?.join(", ")}</p>
            </div>
          ))}
      </div>
    </Container>
  )
}

export default ProgramSearch