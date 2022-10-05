import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Card, Container } from "react-bootstrap"
import moment from 'moment';

const render = ( data ) => {
  let shownEvents = data.allWpEvent.edges;
  let colClasses;
  
  switch(shownEvents.length) {
      case 1:
          colClasses = " col";
      break;
      case 2:
          colClasses = " col-md-6";
      break;
      case 3:
          colClasses = " col-xl-4";
      break;
      default:
          colClasses = " col-xl-3 col-md-6";
      break;
  }
  
  return (
    <Container>
      <h2 className="mb-5">Events</h2>
      <a href="https://news.uoguelph.ca/events/">All Events</a>
      {shownEvents ? 
      <div className="gy-0">
        <ul className="event-list row gx-3 gy-5 mb-5">
        {shownEvents.map(wpEvent => {
            let eventMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMM");
            let eventDay = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("D");
            let eventStartTime = moment(wpEvent.node.startDate,"YYYY-MM-DD HH:mm").format("h:mm A");
            let eventEndTime = moment(wpEvent.node.endDate,"YYYY-MM-DD HH:mm").format("h:mm A");
            let eventLink = wpEvent.node.url ? wpEvent.node.url : "https://news.uoguelph.ca" + wpEvent.node.uri;
            
            let srMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMMM");
            let srDayName = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("dddd");
            let srDayNumber = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("Do");
            
            return (
              <Card as="li" key={wpEvent.node.id} className={"border-0 flex-row" + colClasses}>
                  <div className="event-day col-3 col-md-4 col-xl-4 border border-5 d-flex me-3 p-2" aria-hidden="true">
                      <p className="align-self-center mb-0 mx-auto text-center w-50">
                          <span className="fs-2 text-nowrap text-uppercase">{eventMonth}</span> <span className="display-4 fw-bold text-nowrap">{eventDay}</span>
                      </p>
                  </div>
                  <Card.Body className="col d-flex flex-column pt-0 pb-0 ps-0">
                      <a className="event-title border-0 fs-4 fw-bold lh-base stretched-link text-decoration-none" href={eventLink}>{wpEvent.node.title}</a>
                      <p className="fs-4 mt-auto mb-0"><span className="visually-hidden">Happening on {srDayName} {srMonth} {srDayNumber} from </span><time dateTime={wpEvent.node.startDate}>{eventStartTime}</time> to <time dateTime={wpEvent.node.endDate}>{eventEndTime}</time></p>
                  </Card.Body>
              </Card>
            )
        })}
        </ul>
      </div>
  
      : <p>No events at this time.</p>}
    </Container>
  )
}

// termTaxonomyId 21 = Homepage
const query = graphql`
  query {
    allWpEvent (
      filter: {terms: {nodes: {elemMatch: {termTaxonomyId: {eq: 21}}}}, isPast: {eq: false}}
      sort: {fields: startDate, order: ASC}
      limit: 3
    ) {
      edges {
        node {
          id
          title
          startDate
          endDate
          uri
          url
          eventsCategories {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`

export default function Events () {
  return <StaticQuery query={query} render={allWpEvent => render (allWpEvent)} />
}