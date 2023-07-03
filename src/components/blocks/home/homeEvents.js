import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"
import styled from "styled-components"

// termTaxonomyId 21 = Homepage
const query = graphql`
  {
    allWpEvent(
      filter: { terms: { nodes: { elemMatch: { termTaxonomyId: { eq: 21 } } } }, isPast: { eq: false } }
      sort: { startDate: ASC }
      limit: 3
    ) {
      edges {
        node {
          id
          title
          startDate
          uri
          url
        }
      }
    }
  }
`

const CalendarIcon = styled.div`
  width: 5rem;
  height: 5rem;

  > :first-child {
    font-size: 1.5rem;
  }
`

export default function Events() {
  const data = useStaticQuery(query)
  const events = data.allWpEvent.edges

  return (
    <div className="d-flex flex-column col-md">
      <h2 className="text-primary">Events</h2>

      {events ? (
        <ul className="d-flex flex-column flex-grow-1 list-unstyled">
          {events.map(event => (
            <li key={event.node.id} className="py-3 d-flex flex-grow-1">
              <CalendarIcon
                className="align-items-center bg-warning d-flex flex-column justify-content-center flex-shrink-0 py-2"
                aria-hidden="true"
              >
                <span className="fw-bold text-nowrap text-uppercase">
                  {moment(event.node.startDate, "YYYY-MM-DD").format("MMM")}
                </span>
                <span className="fw-bold text-nowrap text-uppercase">
                  {moment(event.node.startDate, "YYYY-MM-DD").format("D")}
                </span>
              </CalendarIcon>
              <a
                className="text-decoration-none link-dark px-3 h-100 d-block"
                href={event.node.url ? event.node.url : "https://news.uoguelph.ca" + event.node.uri}
              >
                {event.node.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events at this time.</p>
      )}

      <a className="py-2 mt-auto" href="https://news.uoguelph.ca/events/">
        Events Calendar
      </a>
    </div>
  )
}
