import React, { useEffect, useState } from "react"
import { useProgramData } from "../hooks/yaml/use-program-data"
import { Container } from "react-bootstrap"
import { toTitleCase } from "../utils/toTitleCase"
import "../styles/program-search.scss"

const pattern = /\s+|\band\b|\bof\b|\bin\b/g

// Returns a positive integer representing how well the program matches the keywords (lower is better) or -1 if it doesn't match
const getProgramRank = (program, keywords) => {
  // Split some of the program props into an array of words just like the keywords.
  // TODO: consider doing this once when the data is loaded instead of every time the user searches.
  const title = program.title.toLowerCase().split(pattern)
  const degrees = program.degrees
    .map(degree => degree.toLowerCase())
    .join(" ")
    .split(pattern)
    .filter(word => word.length > 0)
  const tags = program.tags.map(tag => tag.toLowerCase())

  // We rank each keyword individually, then take the highest (lowest number) rank as the program's rank overall.
  // If any single keyword doesn't match (i.e. rank = -1), then the program as a whole doesn't match.
  return keywords.reduce((rank, keyword) => {
    // The previous keyword didn't match, so this keyword can't match either, so we don't need to get its rank.
    if (rank === -1) return -1

    // If any word in the title starts with or is equal to the keyword return 0 (highest rank).
    if (title.some(word => word.startsWith(keyword))) return 0

    // TODO: consider using levenshtein distance for fuzzy matching title words against keyword.

    // if the keyword is in the program's degrees, return 1 if the none of the previous keywords had a higher rank.
    if (degrees.some(word => word.startsWith(keyword))) return isNaN(rank) ? 1 : Math.min(rank, 1)

    // If the keyword is in the program's tags, return 2 if the none of the previous keywords had a higher rank.
    if (tags.some(tag => tag.startsWith(keyword))) return isNaN(rank) ? 2 : Math.min(rank, 2)

    return -1
  }, NaN)
}

// Split the user's input into an array of keywords
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

// Filter the list of programs based on keywords
const filterProgramsByKeywords = (programs, keywords) => {
  if (keywords.length === 0) return programs

  return (
    programs
      // Add a rank to each program based on how well it matches the user's input
      .map(program => ({ ...program, rank: getProgramRank(program, keywords) }))
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

const getTypes = programs => {
  const types = new Set()

  for (const program of programs) {
    for (const type of program.types) {
      types.add(type)
    }
  }

  return Array.from(types)
}

const ProgramCard = ({ title, acronym, url = "#", degrees = [], types = [] }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{acronym ? `${title} (${acronym})` : title}</h5>
      <p className="card-text">
        {degrees.map(degree => (
          <span className="d-block" key={degree}>
            {degree}
          </span>
        ))}
      </p>
      <a href={url} className="stretched-link"></a>
    </div>

    <div className="card-footer text-muted bg-info bg-opacity-10">{toTitleCase(types.join(", "))}</div>
  </div>
)

const ProgramSearch = () => {
  const data = useProgramData()
  const types = getTypes(data)
  const [programs, setPrograms] = useState(data)
  const [keywords, setKeywords] = useState([])
  const [selectedType, setSelectedType] = useState("")

  useEffect(() => {
    const filteredPrograms = filterProgramsByKeywords(data, keywords).filter(program => {
      if (selectedType === "") return true
      return program.types.includes(selectedType)
    })

    setPrograms(filteredPrograms)
  }, [data, keywords, selectedType])

  return (
    <Container>
      <h1 className="my-5">Program Search</h1>
      <div className="row gap-5 gap-lg-0">
        <div className="col-lg-9">
          <label htmlFor="program-search-input" className="form-label">
            Search by keywords
          </label>
          <input
            id="program-search-input"
            className="form-control form-control-md"
            type="text"
            onChange={e => setKeywords(parseUserInput(e.target.value))}
          />
        </div>

        <div className="col-lg-3">
          <label htmlFor="program-type-select" className="form-label" defaultValue="">
            Filter by degree type
          </label>
          <select id="program-type-select" className="form-select" onChange={e => setSelectedType(e.target.value)}>
            <option value="">Any</option>
            {types.map(type => (
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
