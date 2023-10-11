import React, { useEffect, useState } from "react"
import { useProgramData } from "../hooks/yaml/use-program-data"
import { Container } from "react-bootstrap"
import { toTitleCase } from "../utils/toTitleCase"
import "../styles/program-search.scss"

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

// Split the user's input into an array of search terms
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

// Filter the list of programs based on the search terms
const filterPrograms = (programs, searchTerms) => {
  if (searchTerms.length === 0) return programs

  return (
    programs
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
  )
}

const ProgramCard = ({ title = "", url = "", degrees = [], types = [] }) => (
  <div className="card my-5">
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">
        {degrees.map(degree => (
          <span key={degree}>{degree}</span>
        ))}
      </p>
      <a href={url} className="stretched-link"></a>
    </div>

    <div className="card-footer text-muted bg-info bg-opacity-10">{toTitleCase(types.join(", "))}</div>
  </div>
)

const ProgramSearch = () => {
  const data = useProgramData()
  const [programs, setPrograms] = useState(data)
  const [searchTerms, setSearchTerms] = useState([])

  useEffect(() => {
    const filteredPrograms = filterPrograms(data, searchTerms)
    setPrograms(filteredPrograms)
  }, [data, searchTerms])

  return (
    <Container>
      <h1>Program Search</h1>
      <input
        className="form-control form-control-lg mt-5"
        type="text"
        placeholder="Search for a program"
        onChange={e => setSearchTerms(parseUserInput(e.target.value))}
      />
      <div id="program-search-grid" className="my-5">
        {programs.map(program => (
          <ProgramCard key={program.id} {...program} />
        ))}
      </div>
    </Container>
  )
}

export default ProgramSearch