import { toTitleCase } from "../../../utils/toTitleCase"
import React from "react"

export const ProgramCard = ({ title, acronym, url = "#", degrees = [], types = [] }) => (
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

    <div className="card-footer text-muted bg-info bg-opacity-10">{types.join(", ")}</div>
  </div>
)
