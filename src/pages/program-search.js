import React, { useState, useEffect } from "react"
import { useProgramData } from "../hooks/yaml/use-program-data"
import { Card, Container } from "react-bootstrap"
import { editDistance } from "../utils/editDistance"

// Returns a positive integer representing how well the program matches the input string (lower is better) or -1 if it doesn't match
const getProgramRank = (program, input) => {
  return program.title.toLowerCase().includes(input.toLowerCase()) ? 0 : -1
}

const ProgramCard = ({ title = "", url = "", degrees = [], types = [] }) => (
  <div className="mb-5">
    <div className="h5">{title}</div>

    {degrees.map(degree => (
      <div key={degree}>{degree}</div>
    ))}

    <div>{types.join(", ")}</div>
  </div>
)

const ProgramSearch = () => {
  const data = useProgramData()
  const [programs, setPrograms] = useState(data)
  const [input, setInput] = useState("")

  useEffect(() => {
    const filteredPrograms = data
      // Add a rank to each program based on how well it matches the user's input
      .map(program => ({ ...program, rank: getProgramRank(program, input) }))
      // Filter out programs that don't match the input
      .filter(program => program.rank >= 0)
      // Sort by rank and title
      .sort((a, b) => {
        // Sort by rank
        if (a.rank < b.rank) return -1
        if (a.rank > b.rank) return 1

        // If rank is the same, sort alphabetically by title
        return a.title.localeCompare(b.title)
      })

    // Update the programs state
    setPrograms(filteredPrograms)
  }, [input])

  return (
    <Container>
      <h1>Program Search</h1>
      <input type="text" onChange={e => setInput(e.target.value)} />
      <div className="my-5">
        {programs.map(program => (
          <ProgramCard key={program.id} {...program} />
        ))}
      </div>
    </Container>
  )
}

export default ProgramSearch
