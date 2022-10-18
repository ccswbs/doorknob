import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Card, Container } from "react-bootstrap"
import moment from 'moment';
import styled from 'styled-components';

const EventLink = styled.a`
  color: #000000;
  text-decoration-color: #8ed1ff;
  text-underline-offset: 4px;
`

const render = ( data ) => {
  let shownEvents = data.allWpEvent.edges;
  let colClasses;
  
  switch(shownEvents.length) {
      case 1:
          colClasses = "col";
      break;
      // three columns
      case 3:
          colClasses = "col-xl-4";
      break;
      default:
          colClasses = "col-md-6";
      break;
  }
  
  return (
    <div className="bg-info bg-opacity-10 content-block row">
      <div className="p-5">
        <Container>
          <div className="align-items-center d-flex justify-content-between mb-3">
            <h2 className="text-primary">Events</h2>
            <a className="btn-info btn btn-sm px-3" href="https://news.uoguelph.ca/events/">All Events <i className="fa-solid fa-chevron-right" aria-hidden="true" /></a>
          </div>
          {shownEvents ? 
          <div className="gy-0">
            <ul className="g-5 row row-cols-md-3 px-0 ">
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
                  <Card as="li" key={wpEvent.node.id} className={"border-0 bg-transparent flex-row " + colClasses}>
                    <div className="align-self-start bg-warning border-0 col-2 col-md-4 col-xl-2 d-flex justify-self-start me-4 p-2" aria-hidden="true">
                      <p className="align-self-center mb-0 mx-auto text-center w-75">
                        <span className="fs-5 fw-bold text-nowrap text-uppercase">{eventMonth}</span> <span className="display-5 fw-bold text-nowrap">{eventDay}</span>
                      </p>
                    </div>
                    <Card.Body className="col d-flex flex-column pb-0 ps-0 pt-0">
                      <EventLink className="border-0 lh-base mb-2 stretched-link" href={eventLink}>{wpEvent.node.title}</EventLink>
                      <p className="fs-6 mb-0 text-black-75"><span className="visually-hidden">Happening on {srDayName} {srMonth} {srDayNumber} from </span><time dateTime={wpEvent.node.startDate}>{eventStartTime}</time> to <time dateTime={wpEvent.node.endDate}>{eventEndTime}</time></p>
                    </Card.Body>
                  </Card>
                )
            })}
            </ul>
          </div>
      
          : <p>No events at this time.</p>}
        </Container>
      </div>
    </div>
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