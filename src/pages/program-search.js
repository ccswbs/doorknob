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
const filterProgramsBySearchInput = (programs, searchTerms) => {
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

const getDegreeTypes = programs => {
  const types = new Set()

  for (const program of programs) {
    for (const type of program.types) {
      types.add(type)
    }
  }

  return Array.from(types)
}

const ProgramCard = ({ title, acronym, url = "#", degrees = [], types = [] }) => (
  <div className="card my-5">
    <div className="card-body">
      <h5 className="card-title">{acronym ? `${title} (${acronym})` : title}</h5>
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
  const degreeTypes = getDegreeTypes(data)
  const [programs, setPrograms] = useState(data)
  const [searchTerms, setSearchTerms] = useState([])
  const [selectedDegreeType, setSelectedDegreeType] = useState("")

  useEffect(() => {
    const filteredPrograms = filterProgramsBySearchInput(data, searchTerms).filter(program => {
      if (selectedDegreeType === "") return true
      return program.types.includes(selectedDegreeType)
    })

    setPrograms(filteredPrograms)
  }, [data, searchTerms, selectedDegreeType])

  return (
    <Container>
      <h1 className="my-5">Program Search</h1>
      <div className="row gap-5 gap-lg-0">
        <div className="col-lg-9">
          <label htmlFor="program-search-input" className="form-label">
            Search for a Program
          </label>
          <input
            id="program-search-input"
            className="form-control form-control-md"
            type="text"
            onChange={e => setSearchTerms(parseUserInput(e.target.value))}
          />
        </div>

        <div className="col-lg-3">
          <label htmlFor="degree-type-select" className="form-label">
            Filter by Degree Type
          </label>
          <select id="degree-type-select" className="form-select" onChange={e => setSelectedDegreeType(e.target.value)}>
            <option value="" selected>
              Any
            </option>
            {degreeTypes.map(type => (
              <option key={type} value={type}>
                {toTitleCase(type)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div id="program-search-grid" className="my-5">
        {programs.map(program => (
          <ProgramCard key={program.id} {...program} />
        ))}
      </div>
    </Container>
  )
}

export default ProgramSearch
