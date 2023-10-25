import { toTitleCase } from "../../../utils/toTitleCase"
import React from "react"

export const ProgramCard = ({ title, acronym, url = "#", degrees = [], types = [], tags = []}) => (
  <div className="card">
    <div className="card-body d-flex flex-column">
      <a href={url} className="card-title stretched-link text-decoration-none fw-bold fs-5">{acronym ? `${title} (${acronym})` : title}</a>
      <p className="card-text">
        {degrees.map(degree => (
          <span className="d-block" key={degree}>
            {degree}
          </span>
        ))}
      </p>
      <span className="d-block program-tags">{tags.map(tag => toTitleCase(tag)).join(", ")}</span>
    </div>

    <div className="card-footer text-muted bg-info bg-opacity-10">{types.join(", ")}</div>
  </div>
)
