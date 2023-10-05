import React, { useState, useEffect } from "react"
import { useProgramData } from "../hooks/yaml/use-program-data"
import { Card, Container } from "react-bootstrap"
import { editDistance } from "../utils/editDistance"

const pattern = /\s+|and/g

// Returns a positive integer representing how well the program matches the input string (lower is better) or -1 if it doesn't match
const getProgramRank = (program, searchTerms) => {
  for (const term of searchTerms) {
    if (program.title.toLowerCase().includes(term)) {
      return 0
    }
  }

  return -1
}

const parseUserInput = input => {
  return (
    input
      .toLowerCase()
      // Remove leading and trailing whitespace
      .trim()
      // Remove all non-alphabetic and non-whitespace characters
      .replace(/[^a-zA-Z\s]/g, "")
      // Split on whitespace and "and"
      .split(pattern)
      // Remove empty strings
      .filter(word => word.length > 0)
  )
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
  const [searchTerms, setSearchTerms] = useState([])

  useEffect(() => {
    if (searchTerms.length === 0) {
      setPrograms(data)
      return
    }

    const filteredPrograms = data
      // Add a rank to each program based on how well it matches the user's input
      .map(program => ({ ...program, rank: getProgramRank(program, searchTerms) }))
      // Filter out programs that don't match the input at all
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
  }, [searchTerms])

  return (
    <Container>
      <h1>Program Search</h1>
      <input type="text" onChange={e => setSearchTerms(parseUserInput(e.target.value))} />
      <div className="my-5">
        {programs.map(program => (
          <ProgramCard key={program.id} {...program} />
        ))}
      </div>
      {JSON.stringify(searchTerms)}
    </Container>
  )
}

export default ProgramSearch
